import 'reflect-metadata';
import express from 'express';
import { connectDb, prisma } from './prismaClient';
import { api } from './api';

const PORT = process.env.PORT ?? 8000;

const start = async () => {
	const app = express();

	app.use(express.json());
	await connectDb();

	app.get('/', (_, res) => {
		res.send('Hello World');
	});

	// All api routes
	app.use('/api', api);

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
