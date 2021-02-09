import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

export function auth(permission: string) {
	return async function (req: any, res: any, next: NextFunction) {
		// Get token and check if it exists
		const token: string | undefined = req.header('authtoken');
		if (!token) {
			return res.sendStatus(401);
		}

		const TOKEN_SECRET: any = process.env.TOKEN_SECRET;

		// Verify token and assign it to req.user
		try {
			const verifiedToken: string | object = jwt.verify(token, TOKEN_SECRET);
			req.user = verifiedToken;
		} catch (error) {
			return res.status(400).send('Invalid Token');
		}

		// Validate their ID params
		const { error } = Joi.object({
			userID: Joi.string().hex().min(24).max(24),
			entryID: Joi.string().hex().min(24).max(24),
		}).validate(req.params);
		if (error) {
			return res.status(400).send('Invalid Parameter');
		}

		// If permission is empty than no need to check
		if (permission === '') {
			return next();
		}

		// If they are admin override checking their perms
		if (req.user.isAdmin === true) {
			return next();
		} else if (permission === 'admin') {
			return res.status(403).send('This request requires being admin');
		}

		// Check if they have permission
		if (req.user.permissions.includes(permission)) {
			return next();
		}

		return res
			.status(403)
			.send(`This request requires the ${permission} permission`);
	};
}
