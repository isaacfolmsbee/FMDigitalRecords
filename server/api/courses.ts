import express from 'express';
import mongodb, { Collection } from 'mongodb';
import { dbHandler } from '../tools/db';
import Joi from 'joi';
const router = express.Router();

router.post('/', async (req: any, res: any) => {
	// Validate req body
	const { error } = Joi.object({
		courseCode: Joi.string()
			.required()
			.regex(
				RegExp(
					'([A-Z]{2}\\s((([0-9]{3}-[0-9]{3}-[0-9])|([0-9]{3}-[0-9]{3}))|(([0-9]{3}-[0-9])|([0-9]{3}))))'
				)
			),
		courseName: Joi.string().required().min(1),
		courseDescription: Joi.string().required().min(1),
		creditHours: Joi.number().required().integer().min(1),
		weeklyClassHours: Joi.number().integer().min(1),
		weeklyLabHours: Joi.number().integer().min(1),
		labFee: Joi.number().min(1),
		prerequisite: Joi.string(),
		academicYear: Joi.string().required().regex(RegExp('[0-9]{4}-[0-9]{4}')),
	}).validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const courses: Collection = await dbHandler('courses');

	await courses.insertOne({
		courseCode: req.body.courseCode,
		courseName: req.body.courseName,
		courseDescription: req.body.courseDescription,
		creditHours: req.body.creditHours,
		weeklyClassHours: req.body.weeklyClassHours,
		weeklyLabHours: req.body.weeklyLabHours,
		labFee: req.body.labFee,
		prerequisite: req.body.prerequisite,
		academicYear: req.body.academicYear,
	});

	res.sendStatus(201);
});

router.get('/', async (req: any, res: any) => {
	const courses: Collection = await dbHandler('courses');

	const query: Array<Object> = await courses
		.find()
		.sort({ academicYear: 1, courseCode: 1, courseName: 1 })
		.toArray();

	res.status(200).send(query);
});

export { router };
