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
		const { title, groupTitle } = req.body;
		const { groupId } = req.query;

		const newGroupOrUndefined = groupTitle
			? {
					create: {
						title: groupTitle as string,
						userId: req.user.id,
					},
			  }
			: undefined;

		const connectGroup = groupId
			? {
					connect: {
						id: Number(groupId),
					},
			  }
			: undefined;

		const count = await prisma.count.create({
			data: {
				title,
				user: {
					connect: {
						id: req.user.id,
					},
				},
				group: newGroupOrUndefined ?? connectGroup,
			},
		});

		res.send(count);
	} catch (error) {
		res.status(500).send(`Unable to create a new count: ${error}`);
	}
};
