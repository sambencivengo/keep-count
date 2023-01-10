import { Handler } from 'express';
import { prisma } from '../../prismaClient';

export const get: Handler = async (req, res) => {
	const { user } = req;

	try {
		const groups = await prisma.group.findMany({
			orderBy: [
				{
					createdAt: 'desc',
				},
			],
			where: {
				userId: Number(user.id),
			},
		});

		if (!groups) {
			res.status(400).send('Unable to get counts');
			return;
		}

		res.send(groups);
	} catch (error) {
		res.status(500).send(`Unable to get groups ${error}`);
		return;
	}
};
