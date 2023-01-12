import { Center, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { CountsContainer } from '../components/CountsContainer';
import { useUser } from '../components/UserProvider';

export default function Home() {
	const { user, isLoading } = useUser();

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
				{isLoading && !user ? (
					<Center>
						<Spinner />
					</Center>
				) : (
					<CountsContainer />
				)}
			</main>
		</>
	);
}
