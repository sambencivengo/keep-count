import { Handler } from 'express';

export const get: Handler = (_, res) => {
	res.send('Hello');
};