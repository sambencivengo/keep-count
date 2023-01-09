import Head from 'next/head';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { useUser } from '../components/UserProvider';
import React from 'react';
import { Count } from '@prisma/client';
import { baseUrl } from '../constants';

export default function Home() {
	const { user } = useUser();
	const [counts, setCounts] = React.useState<Count[]>([]);

	const getCounts = async (): Promise<Count[]> => {
		try {
			const res = await fetch(`${baseUrl}api/counts`, {
				credentials: 'include',
			});
			if (!res.ok) {
				setCounts([]);
				console.error('Unable to get counts');
			}
			const data = await res.json();
			setCounts([...data]);

			return counts;
		} catch (error) {
			console.error(error);
			setCounts([]);
			return counts;
		}
	};

	React.useEffect(() => {
		getCounts();
	}, []);

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
					<Box>Count</Box>
				</VStack>
			</main>
		</>
	);
}
