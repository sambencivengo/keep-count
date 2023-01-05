import { Handler } from 'express';

export const put: Handler = (req, res) => {
	const { countId } = req.params;

	console.log(req.session);

	res.send({ countId });
};
