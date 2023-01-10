import { Handler } from 'express';
import { prisma } from '../../prismaClient';

export const get: Handler = async (req, res) => {
	const { user: userId } = req.session;

	try {
		const counts = await prisma.count.findMany({
			orderBy: [
				{
					createdAt: 'desc',
				},
			],
			where: {
				userId: Number(userId),
			},
		});

		if (!counts) {
			res.status(400).send('Unable to get counts');
			return;
		}

		res.send(counts);
	} catch (error) {
		res.status(500).send(`Unable to get counts: ${error}`);
		return;
	}
};
