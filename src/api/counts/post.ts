import { Count } from '@prisma/client';
import { Handler } from 'express';
import { prisma } from '../../prismaClient';

export const post: Handler = async (req, res) => {
	try {
		const { title } = req.body as Count;

		const count = await prisma.count.create({
			data: {
				title,
				user: {
					connect: {
						id: req.user.id,
					},
				},
			},
		});

		res.send(count);
	} catch (error) {
		res.status(500).send(`Unable to create a new count: ${error}`);
	}
};
