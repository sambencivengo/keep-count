import { VStack, Heading, Wrap } from '@chakra-ui/react';
import { Count } from '@prisma/client';
import React from 'react';
import { baseUrl } from '../constants';
import { CountCard } from './CountCard';

interface CountsContainerProps {}

export const CountsContainer: React.FC<CountsContainerProps> = ({}) => {
	const [counts, setCounts] = React.useState<Count[] | null>(null);

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
		<VStack gap={5}>
			<Heading>Your Counts:</Heading>
			<Wrap spacing={10} justify="center">
				{counts &&
					counts.map((count) => (
						<CountCard key={count.id} count={count} />
					))}
			</Wrap>
		</VStack>
	);
};
