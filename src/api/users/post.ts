import { Handler } from 'express';
import * as argon2 from 'argon2';
import { prisma } from '../../prismaClient';

export const post: Handler = async (req, res) => {
	const { username, password } = req.body;

	const hashedPassword = await argon2.hash(password);

	try {
		const newUser = await prisma.user.create({
			data: {
				username: (username as string).toLowerCase(),
				password: hashedPassword,
			},
		});

		res.send(newUser);
	} catch (error) {
		res.status(500).send(`Unable to create new user: ${error}`);
		return;
	}
	res.send('users post');
};
