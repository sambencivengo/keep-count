import 'reflect-metadata';
import express from 'express';
import { connectDb, prisma } from './prismaClient';
import { api } from './api';

const PORT = process.env.PORT ?? 8000;

const start = async () => {
	const app = express();

	await connectDb();

	app.use('/api', api);

	app.get('/', (_, res) => {
		res.send('Hello World');
	});

	app.listen(PORT, () => {
		console.log(`Application is listening on port ${PORT}`);
	});
};
start()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
