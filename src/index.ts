import 'reflect-metadata';
import express from 'express';
import { connectDb, prisma } from './prismaClient';

const PORT = process.env.PORT ?? 8000;

const start = async () => {
	const app = express();

	await connectDb();

	app.get('/', (_, res) => {
		res.send('Hello World');
	});

	// PRISMA TEST
	const queryTest = async () => {
		// await prisma.user.create({
		// 	data: {
		// 		userName: 'sam2',
		// 		email: 'sam2@prisma.io',
		// 		password: 'password',
		// 		counts: {
		// 			create: { title: 'burgers eaten' },
		// 		},
		// 	},
		// });

		const allUsers = await prisma.user.findMany({
			include: {
				counts: true,
			},
		});
		console.dir(allUsers, { depth: null });
	};

	queryTest()
		.then(async () => {
			await prisma.$disconnect();
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
	// END PRISMA

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
