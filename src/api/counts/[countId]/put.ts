import { Handler } from 'express';
import { prisma } from '../../../prismaClient';

export const put: Handler = async (req, res) => {
	const { countId } = req.params;
	const { user } = req;
	const { purpose } = req.query;

	try {
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
		if (!count) {
			res.status(400).send('Unable to edit count');
			return;
		}

		res.send({ count, user });
	} catch (error) {
		res.status(500).send('Unable to delete count');
		return;
	}
};
