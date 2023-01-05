import { Handler } from 'express';
import { prisma } from '../../../prismaClient';

export const get: Handler = async (req, res) => {
	const { countId } = req.params;

	if (!req.session.user) {
		res.status(403).send('Must have an account to get counts');
		return;
	}

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
	} catch (error) {
		res.status(500).send(`Unable to get count: ${error}`);
		return;
	}
};
