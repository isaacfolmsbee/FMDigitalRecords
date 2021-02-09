import express from 'express';
import mongodb, { Collection } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbHandler } from '../tools/db';
import { auth } from '../tools/auth';
import Joi from 'joi';
const router = express.Router();

router.post('/', async (req: any, res: any) => {
	//Validate the request
	const { error } = Joi.object({
		username: Joi.string().required().min(4),
		password: Joi.string().required().min(8),
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
		permissions: {
			admin: false,
			editDB: false,
		},
	});

	res.sendStatus(201);
});

router.put('/:userID', auth('admin'), async (req: any, res: any) => {
	//Validate the request
	const { error } = Joi.object({
		permissions: Joi.object({
			admin: Joi.boolean().required(),
			editDB: Joi.boolean().required(),
		}).required(),
	}).validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const users: Collection = await dbHandler('users');

	users.updateOne(
		{ _id: new mongodb.ObjectID(req.params.userID) },
		{ $set: { permissions: req.body.permissions } }
	);

	res.status(200).send();
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
			permissions: {
				admin: user.permissions.admin,
				editDB: user.permissions.editDB,
			},
		},
		TOKEN_SECRET
	);
	res.header('authtoken', token).status(202).send(user.permissions);
});

router.post('/timesheet', auth(''), async (req: any, res: any) => {
	//Validate the request
	const { error } = Joi.object({
		timeIn: Joi.date().required(),
		timeOut: Joi.date().required(),
		description: Joi.string().required().min(1),
	}).validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const users: Collection = await dbHandler('users');

	await users.updateOne(
		{
			_id: new mongodb.ObjectID(req.user.userid),
		},
		{
			$push: {
				timesheet: {
					$each: [
						{
							_id: new mongodb.ObjectID(),
							timeIn: req.body.timeIn,
							timeOut: req.body.timeOut,
							description: req.body.description,
						},
					],
					$sort: { timeIn: 1 },
				},
			},
		}
	);

	res.sendStatus(201);
});

router.delete('/timesheet/:entryID', auth(''), async (req: any, res: any) => {

	const users: Collection = await dbHandler('users');

	await users.updateOne(
		{
			_id: new mongodb.ObjectID(req.user.userid),
		},
		{
			$pull: {
				timesheet: {
					_id: new mongodb.ObjectID(req.params.entryID),
				},
			},
		}
	);

	res.sendStatus(200);
});

export { router };
