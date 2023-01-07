import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDb, prisma } from './prismaClient';
import { api } from './api';
import createMemoryStore from 'memorystore';
import session from 'express-session';
import cors from 'cors';

const MemoryStore = createMemoryStore(session);
const PORT = process.env.PORT ?? 8000;

const start = async () => {
	const app = express();

	await connectDb();

	app.use(
		cors<cors.CorsRequest>({
			origin: ['http://localhost:3000'],
			credentials: true,
		})
	);

	app.use(
		session({
			store: new MemoryStore({
				checkPeriod: 86400000,
			}),
			name: 'keep-count-cookie',
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
				httpOnly: true,
				sameSite: 'lax', // csrf
				secure: false, // TODO: switch to constant
			},
			saveUninitialized: false,
			secret: 'cookiesecret', // TODO: switch to env var
			resave: true,
		})
	);

	app.use(express.json());

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
