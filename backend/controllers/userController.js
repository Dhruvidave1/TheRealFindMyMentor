import { generateToken } from '../utils/generateToken.js';
import Profile from '../models/profileModel.js';

// GET http://localhost:3000/api/user/ INCLUDE TOKEN
export const getUsers = async (req, res) => {
	const user = await Profile.findById(req.Profile._id);
	res.send({
		user,
	});
};

// GET http://localhost:3000/api/user/login
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
		res.status(401)({ message: 'unauthorized, wrong email or password' });
	}
};

// POST http://localhost:3000/api/user/
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

// PATCH http://localhost:3000/api/user/ SEND TOKEN
export const updateUser = async (req, res) => {
	const user = await Profile.findById(req.Profile._id);

	if (user) {
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		// user.email = req.body.email;
		user.biography = req.body.biography;
		user.workLocation = req.body.workLocation;
		user.isMentor = req.body.isMentor;
		user.isMentee = req.body.isMentee;
		user.yearsOfPractice = req.body.yearsOfPractice;
		user.designation = req.body.designation;
		user.zone = req.body.zone;
		user.areaPractice = req.body.areaPractice;
		user.skills = req.body.skills;
		user.areasInterest = req.body.areasInterest;
		user.mentorshipGoals = req.body.mentorshipGoals;
		user.password = req.body.password;

		// Check if the new email is different from the current email
		if (req.body.email && req.body.email !== user.email) {
			const existingUser = await Profile.findOne({ email: req.body.email });

			// If the new email already exists in the database, return an error
			if (existingUser) {
				return res.status(400).json({ error: 'Email address already in use' });
			}

			// Update the user's email
			user.email = req.body.email;
		}

		try {
			const updatedUser = await user.save();
			res.json({
				_id: updatedUser._id,
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,
				email: updatedUser.email,
				biography: updatedUser.biography,
				workLocation: updatedUser.workLocation,
				isMentor: updatedUser.isMentor,
				isMentee: updatedUser.isMentee,
				yearsOfPractice: updatedUser.yearsOfPractice,
				designation: updatedUser.designation,
				zone: updatedUser.zone,
				areaPractice: updatedUser.areaPractice,
				skills: updatedUser.skills,
				areasInterest: updatedUser.areasInterest,
				mentorshipGoals: updatedUser.mentorshipGoals,
				token: generateToken(updatedUser._id),
			});
		} catch (error) {
			// handle errors
			res.status(500).json({ error: 'Server error' });
			console.log(error);
		}
	} else {
		res.status(404);
		throw new Error('User not found');
	}
};
