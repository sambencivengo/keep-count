import { Handler } from 'express';
import { prisma } from '../../../prismaClient';

export const put: Handler = async (req, res) => {
	const { countId } = req.params;
	const { user } = req;
	const count = await prisma.count.findUnique({
		where: {
			id: Number(countId),
		},
	});

	res.send({ countId, user });
};
