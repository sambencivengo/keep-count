import { Handler } from 'express';

export const logout: Handler = (req, res) => {
	try {
		if (req.session) {
			req.session.destroy(() => res.sendStatus(200));
		} else {
			res.sendStatus(400);
		}
	} catch (error) {
		res.status(500).send('Unable to logout');
	}
};
