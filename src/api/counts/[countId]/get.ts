import { Handler } from 'express';

export const get: Handler = async (req, res) => {
	const { countId } = req.params;

	console.log(req.params, req.query);

	res.send(countId);
};
