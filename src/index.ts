import express from 'express';

const PORT = process.env.PORT ?? 8000;
const start = async () => {
	const app = express();

	app.get('/', (_, res) => {
		res.send('Hello World');
	});

	app.listen(PORT, () => {
		console.log(`Application is listening on port ${PORT}`);
	});
};
start();
