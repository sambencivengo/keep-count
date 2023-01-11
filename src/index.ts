import 'reflect-metadata';
import express from 'express';
import { connectDb, prisma } from './prismaClient';
import { api } from './api';
import createMemoryStore from 'memorystore';
import session from 'express-session';
import cors from 'cors';
import next from 'next';
import { env } from './env';

const MemoryStore = createMemoryStore(session);
const PORT = process.env.PORT ?? 8000;
const dev = process.env.nodeEnv !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
	.then(async () => {
		const server = express();

		await connectDb();

		server.use(
			cors<cors.CorsRequest>({
				origin: env.websiteUrl,
				credentials: true,
			})
		);
		server.set('trust proxy', 1);

		server.use(
			session({
				store: new MemoryStore({
					checkPeriod: 86400000,
				}),
				name: 'keep-count-cookie',
				cookie: {
					maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
					httpOnly: false,
					sameSite: 'lax', // csrf
					secure: false, // TODO: switch to constant
				},
				saveUninitialized: false,
				secret: 'cookiesecret', // TODO: switch to env var
				resave: true,
			})
		);

		server.use(express.json());

		server.get('/api/health', (_, res) => {
			res.send('Large and in charge');
		});

		// All api routes
		server.use('/api', api);

		server.get('/*', (req, res) => {
			return handle(req, res);
		});

		server.listen(PORT, () => {
			console.log(`ApplicatIon is listening on port ${PORT}`);
		});
	})
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

// };
// start()
