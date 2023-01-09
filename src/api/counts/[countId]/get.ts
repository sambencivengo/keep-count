import { Handler } from 'express';
import { prisma } from '../../../prismaClient';

export const get: Handler = async (req, res) => {
	const { countId } = req.params;

	try {
		const count = await prisma.count.findFirst({
			where: {
				id: Number(countId),
				userId: req.session.user,
			},
		});

		if (!count) {
			res.status(400).send('Unable to get count');
			return;
		}

		res.send(count);
	} catch (error) {
		res.status(500).send(`Unable to get count: ${error}`);
		return;
	}
};
