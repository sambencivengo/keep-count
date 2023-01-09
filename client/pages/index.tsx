import Head from 'next/head';
import {
	Box,
	Heading,
	IconButton,
	useColorModeValue,
	VStack,
	Flex,
	Wrap,
} from '@chakra-ui/react';
import { useUser } from '../components/UserProvider';
import React from 'react';
import { Count } from '@prisma/client';
import { baseUrl } from '../constants';
import { colors } from '../theme';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

export default function Home() {
	const { user } = useUser();
	const [counts, setCounts] = React.useState<Count[] | null>(null);
	const borderColor = useColorModeValue(
		colors.darkBlueGrey,
		colors.lightGrey
	);

	const getCounts = async (): Promise<void> => {
		try {
			const res = await fetch(`${baseUrl}api/counts`, {
				credentials: 'include',
			});
			if (!res.ok) {
				console.error('Unable to get counts');
			}

			setCounts(await res.json());
		} catch (error) {
			console.error(error);
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
				<VStack gap={5}>
					<Heading>Your Counts:</Heading>
					<Wrap spacing={10} justify="center">
						{counts &&
							counts.map((count) => (
								<Box
									w="300px"
									rounded="md"
									border={`3px solid ${borderColor}`}
									p={30}
									key={count.id}
								>
									<VStack gap={3}>
										<Heading textAlign="center" size={'md'}>
											{count.title}
										</Heading>
										<Flex
											w="100%"
											justifyContent="space-around"
										>
											<IconButton
												fontSize={20}
												aria-label="Minus Symbol Button"
												icon={<MinusIcon />}
											/>
											<Heading size="lg">
												{count.value}
											</Heading>
											<IconButton
												fontSize={20}
												aria-label="Plus Symbol Button"
												icon={<AddIcon />}
											/>
										</Flex>
									</VStack>
								</Box>
							))}
					</Wrap>
				</VStack>
			</main>
		</>
	);
}
