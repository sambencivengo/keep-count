import { Handler } from 'express';
import { prisma } from '../../prismaClient';

export const me: Handler = async (req, res) => {
	const { user: userId } = req.session;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			res.status(400).send('Unable to find valid user account');
			return;
		}

		res.send(user);
	} catch (error) {
		console.log(error);
		res.status(500).send('Unable to get user');
	}
};
