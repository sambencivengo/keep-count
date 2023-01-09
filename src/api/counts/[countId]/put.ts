import { Handler } from 'express';

export const put: Handler = (req, res) => {
	const { countId } = req.params;

	res.send({ countId });
};
