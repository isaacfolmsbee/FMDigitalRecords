import express from 'express';
import mongodb, { Collection } from 'mongodb';
import { dbHandler } from '../tools/db';
import Joi from 'joi';
const router = express.Router();

router.post('/', async (req: any, res: any) => {
	// Validate req body
	const { error } = Joi.object({
		lastName: Joi.string().required().min(1),
		firstName: Joi.string().required().min(1),
		middleInitial: Joi.string().max(1),
		suffix: Joi.string().min(1).valid('Jr.', 'I', 'II', 'III', 'IV', 'V'),
		role: Joi.string().required().min(1),
		department: Joi.string().min(1),
		academicYear: Joi.string().regex(RegExp('\\d\\d\\d\\d-\\d\\d\\d\\d')),
	}).validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const faculty: Collection = await dbHandler('faculty');

	await faculty.insertOne({
		lastName: req.body.lastName,
		firstName: req.body.firstName,
		middleInitial: req.body.middleInitial,
		suffix: req.body.suffix,
		role: req.body.role,
		department: req.body.department,
		academicYear: req.body.academicYear,
	});

	res.sendStatus(201);
});

router.get('/', async (req: any, res: any) => {
	const faculty: Collection = await dbHandler('faculty');

	const query: Array<Object> = await faculty.find().sort({ academicYear: 1, lastName: 1, firstName: 1 }).toArray();

	res.status(200).send(query);
});

export { router };