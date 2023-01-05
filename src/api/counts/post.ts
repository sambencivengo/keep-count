import { Count } from '@prisma/client';
import { Handler } from 'express';
import { prisma } from '../../prismaClient';

export const post: Handler = async (req, res) => {
	const { user: userId } = req.session;
	try {
		const { title } = req.body as Count;

		if (!userId) {
			res.status(400).send('Current user session could not be found');
			return;
		}
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (!user) {
			res.status(400).send('Unable to create a new count');
			return;
		}
		const count = await prisma.count.create({
			data: {
				title,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});

		res.send(count);
	} catch (error) {
		res.status(500).send(`Unable to create a new count: ${error}`);
	}
};
