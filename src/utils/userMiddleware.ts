import { Handler } from 'express';
import { prisma } from '../prismaClient';

export const userMiddleware: Handler = async (req, res, next) => {
	const { user: userId } = req.session;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			res.status(400).send('Unable to create a new count');
			return;
		}

		req.user = user;
		console.log('before next');

		next();
		console.log('after next');
	} catch (error) {
		res.status(500).send(
			`An error occurred while validating the user: ${error}`
		);
	}
};
