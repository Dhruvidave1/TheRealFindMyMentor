import express, { json } from 'express';

const server = express();

const hostname = '127.0.0.1';
const port = 3000;

import userRouter from './routes/userRoutes.js';
import matchRouter from './routes/matchRoutes.js';

server.use(json);

server.use('/api/user', userRouter);
server.use('/api/match', matchRouter);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// const server = http.createServer((req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'text/plain');
// 	res.end('Hello, world!\n');
// });
