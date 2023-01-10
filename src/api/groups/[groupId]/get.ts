import { Handler } from 'express';
import { prisma } from '../../../prismaClient';

export const get: Handler = async (req, res) => {
	const { groupId } = req.params;

	try {
		const group = await prisma.group.findUnique({
			where: {
				id: Number(groupId), // TODO: alter schema so that you can validate the owner of counts and groups
			},
			include: {
				counts: {
					orderBy: [
						{
							createdAt: 'desc',
						},
					],
					include: {
						group: {
							select: {
								id: true,
								title: true,
							},
						},
					},
				},
			},
		});

		if (!group) {
			res.status(400).send('Unable to get group');
			return;
		}

		res.send(group);
	} catch (error) {
		res.status(500).send(`Unable to get counts: ${error}`);
		return;
	}
};
