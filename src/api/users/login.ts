import { Handler } from 'express';
import * as argon2 from 'argon2';
import { prisma } from '../../prismaClient';

export const login: Handler = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await prisma.user.findUniqueOrThrow({
			where: {
				username,
			},
		});

		const validPassword = await argon2.verify(user.password, password);

		if (!validPassword) {
			res.status(400).send('Invalid password');
			return;
		}

		req.session.user = user.id;

		res.send({
			username: user.username,
			id: user.id,
		});
		console.log(req.session);
	} catch (error) {
		res.status(500).send(`Unable to create new user: ${error}`);
		return;
	}
};
