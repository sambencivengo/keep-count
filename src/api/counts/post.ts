import { Count } from '@prisma/client';
import { Handler } from 'express';
import { CreateCountSchema } from '../../schema';
import { prisma } from '../../prismaClient';

export const post: Handler = async (req, res) => {
	try {
		await CreateCountSchema.apiSchema.validate(req.body);
	} catch (error) {
		res.status(400).send(`Validation failed: ${error}`);
		return;
	}

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
