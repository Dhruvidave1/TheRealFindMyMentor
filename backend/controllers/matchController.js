import asyncHandler from 'express-async-handler';
import { getMatches } from '../services/matching.service.js'


const getMatchesController = asyncHandler(async (req, res) => {
    const user = req.Profile._id;
    const matches = await getMatches(user);
	res.send({ matches });
});

export { getMatchesController };
