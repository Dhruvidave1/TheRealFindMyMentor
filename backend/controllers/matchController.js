import asyncHandler from 'express-async-handler';

const getMatches = asyncHandler(async (req, res) => {
	res.send({ success: true, data: 'matches!' });
});

export { getMatches };
