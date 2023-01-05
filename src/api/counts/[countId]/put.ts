import { Handler } from 'express';

export const put: Handler = async (req, res) => {
	const { countId } = req.params;

	res.send(countId);
};
