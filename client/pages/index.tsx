import Head from 'next/head';
import React from 'react';
import { CountsContainer } from '../components/CountsContainer';

export default function Home() {
	return (
		<>
			<Head>
				<title>Keep Count</title>
				<meta
					name="description"
					content="An application to keep track of various counts!"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<CountsContainer />
			</main>
		</>
	);
}
