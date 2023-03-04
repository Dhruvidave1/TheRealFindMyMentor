import express, { json } from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
const server = express();

const hostname = '127.0.0.1';
const port = 3000;

import userRouter from './routes/userRoutes.js';
import matchRouter from './routes/matchRoutes.js';
dotenv.config();
connectDB();

server.use(json);

server.use('/api/user', userRouter);
server.use('/api/match', matchRouter);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
