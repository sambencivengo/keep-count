import { PrismaClient } from '@prisma/client';
import express from 'express';

const PORT = process.env.PORT ?? 8000;
const prisma = new PrismaClient();

const start = async () => {
	const app = express();

	app.get('/', (_, res) => {
		res.send('Hello World');
	});

	// PRISMA TEST
	const queryTest = async () => {
		// await prisma.user.create({
		// 	data: {
		// 		userName: 'sam',
		// 		email: 'sam@prisma.io',
		// 		password: 'password',
		// 		counts: {
		// 			create: { title: 'asdasd' },
		// 		},
		// 	},
		// });
		const allUsers = await prisma.user.findMany();
		console.log(allUsers);
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
start();
