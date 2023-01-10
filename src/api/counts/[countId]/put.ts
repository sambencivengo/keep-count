import { Handler } from 'express';
import { prisma } from '../../../prismaClient';

export const put: Handler = async (req, res) => {
	const { countId } = req.params;
	const { user } = req;
	const { purpose } = req.query;

	const count = await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			counts: {
				update: {
					where: {
						id: Number(countId),
					},
					data: {
						value:
							purpose === 'add'
								? {
										increment: 1,
								  }
								: {
										decrement: 1,
								  },
					},
				},
			},
		},
	});

	res.send({ count, user });
};
