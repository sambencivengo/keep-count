import { Handler } from 'express';
import { prisma } from '../../../prismaClient';

export const destroy: Handler = async (req, res) => {
	const { countId } = req.query;

	try {
		const count = await prisma.count.delete({
			where: {
				id: Number(countId),
			},
		});

		if (!count) {
			res.status(400).send('Unable to delete count');
			return;
		}
		res.send('Count deleted');
	} catch (error) {
		res.status(500).send('Unable to delete count');
		return;
	}
};
