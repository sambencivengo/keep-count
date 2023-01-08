import { Handler } from 'express';

export const me: Handler = async (req, res) => {
	const { user } = req;
	try {
		res.send(user);
	} catch (error) {
		console.log(error);
		res.status(500).send('Unable to get user');
	}
};
