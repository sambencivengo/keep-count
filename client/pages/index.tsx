import Head from 'next/head';
import { Inter } from '@next/font/google';
import { Heading, VStack } from '@chakra-ui/react';
import { useUser } from '../components/UserProvider';

export default function Home() {
	const { user } = useUser();
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
				<VStack>
					<Heading>This is the home page of the application</Heading>
					<Heading size="md">Welcome {user?.username}</Heading>
				</VStack>
			</main>
		</>
	);
}
