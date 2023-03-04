import { generateToken } from '../utils/generateToken.js';
import Profile from '../models/profileModel.js';

export const getUsers = async (req, res) => {
	const user = await Profile.findById(req.Profile._id);
	res.send({
		user,
	});
};

export const authUser = async (req, res) => {
	// data that is being sent from front end
	const { email, password } = req.body;
	// finding a user whose email matches the email coming from front end
	const user = await Profile.findOne({ email: email });

	if (user && (await user.matchPassword(password))) {
		// if user exists, and password matches, we will send this data back
		// token has user id embedded in it as the payload
		res.json({
			_id: user._id,
			first_name: user.firstName,
			last_name: user.lastName,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
	res.send({ email, password });
};

export const createUser = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		password,
		biography,
		workLocation,
		isMentor,
		isMentee,
		yearsOfPractice,
		designation,
		zone,
		areaPractice,
		skills,
		areasInterest,
		mentorshipGoals,
	} = req.body;

	const userExists = await Profile.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await Profile.create({
		firstName,
		lastName,
		email,
		password,
		biography,
		workLocation,
		isMentor,
		isMentee,
		yearsOfPractice,
		designation,
		zone,
		areaPractice,
		skills,
		areasInterest,
		mentorshipGoals,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
};

export const updateUser = async (req, res) => {
	res.send({ success: true, data: 'updateUser!' });
};

export const deleteUser = async (req, res) => {
	res.send({ success: true, data: 'deleteUser!' });
};

// export default controllerMethods;
