import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Profile from './models/profileModel.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.Profile = await Profile.findById(decoded.id).select('-password');
			next();
		} catch (error) {
			console.error(error);
			res.status(401).json({ error: `Not authorized: ${error.message}` });
		}
	}

	if (!token) {
		res.status(401).json({ error: `Not authorized: ${error.message}` });
	}
});

export { protect };
