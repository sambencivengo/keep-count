import { Handler } from 'express';
import * as argon2 from 'argon2';
import { prisma } from '../../prismaClient';
import { CreateUserSchema } from '../../schema';

export const post: Handler = async (req, res) => {
	const { username, password } = req.body;

	try {
		await CreateUserSchema.apiSchema.validate({ username, password });
	} catch (error) {
		res.status(400).send(`Validation failed: ${error}`);
		return;
	}

	const hashedPassword = await argon2.hash(password);

	try {
		const newUser = await prisma.user.create({
			data: {
				username: (username as string).toLowerCase(),
				password: hashedPassword,
			},
		});

		req.session.user = newUser.id;

		res.send(newUser);
	} catch (error) {
		res.status(500).send(`Unable to create new user: ${error}`);
		return;
	}
};
