import express from 'express';
import mongodb, { Collection } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbHandler } from '../tools/db';
import { auth } from '../tools/auth';
import Joi from 'joi';
const router = express.Router();

router.post('/', auth('admin'), async (req: any, res: any) => {
	//Validate the request
	const { error } = Joi.object({
		username: Joi.string().required().min(4),
		password: Joi.string().required().min(8),
		isAdmin: Joi.boolean(),
	}).validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const users: Collection = await dbHandler('users');

	// Check if the user already exists
	const userExists: any = await users.findOne({ email: req.body.username });
	if (userExists) {
		return res.status(400).send('username in use');
	}

	// Hash the password
	const salt: string = await bcrypt.genSalt(10);
	const hashedPassword: string = await bcrypt.hash(req.body.password, salt);

	await users.insertOne({
		username: req.body.username,
		password: hashedPassword,
		isAdmin: req.body.isAdmin ?? false,
	});

	res.sendStatus(201);
});

router.delete('/:userID', auth('admin'), async (req: any, res: any) => {
	const users: Collection = await dbHandler('users');

	await users.deleteOne({ _id: new mongodb.ObjectID(req.params.userID) });

	res.status(200).send();
});

router.post('/login', async (req: any, res: any) => {
	const users: Collection = await dbHandler('users');

	//Validate the request
	const { error } = Joi.object({
		username: Joi.string().required().min(4),
		password: Joi.string().required().min(8),
	}).validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Check if the user exists
	const user: any = await users.findOne({ username: req.body.username });
	if (!user) {
		return res.status(400).send('User not found');
	}

	// Check if password is correct
	const validPassword: boolean = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!validPassword) {
		return res.status(400).send('Invalid password');
	}

	const TOKEN_SECRET: any = process.env.TOKEN_SECRET;

	// Create and assign a token
	const token: string = jwt.sign(
		{
			userid: user._id,
			username: user.username,
			isAdmin: user.isAdmin,
		},
		TOKEN_SECRET
	);
	res.header('authtoken', token).status(202).send(token);
});

export { router };
