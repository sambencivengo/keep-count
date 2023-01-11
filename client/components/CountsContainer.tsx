import { VStack, Heading, Wrap, useToast } from '@chakra-ui/react';
import { Count } from '@prisma/client';
import React from 'react';
import { baseUrl } from '../constants';
import { CountCard } from './CountCard';

export interface ManipulateCountProps {
	buttonPurpose: 'add' | 'subtract';
	countId: number;
}

export interface CountWithGroupTitleAndId extends Count {
	group: {
		id: number;
		title: string;
	};
}

export const CountsContainer: React.FC = ({}) => {
	const [counts, setCounts] = React.useState<
		CountWithGroupTitleAndId[] | null
	>(null);
	const toast = useToast();

	const manipulateCount = async ({
		buttonPurpose,
		countId,
	}: ManipulateCountProps): Promise<void> => {
		try {
			const res = await fetch(
				`${baseUrl}api/counts/${countId}?purpose=${buttonPurpose}`,
				{
					method: 'PUT',
					headers: {
						'content-type': 'application/json',
					},
					credentials: 'include',
				}
			);
			if (!res.ok) {
				toast({
					description: 'Unable to change count',
					status: 'error',
					variant: 'solid',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});
				return;
			}
			await res.json();
			getCounts();
		} catch (error) {
			toast({
				description: 'Unable to change count',
				status: 'error',
				variant: 'solid',
				duration: 4000,
				isClosable: true,
				position: 'top',
			});
			console.error(error);
		}
	};

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

	console.log(counts);

	return (
		<VStack gap={5}>
			<Heading>Counts</Heading>
			<Wrap spacing={10} justify="center">
				{counts &&
					counts.map((count) => (
						<CountCard
							manipulateCount={manipulateCount}
							key={count.id}
							count={count}
						/>
					))}
			</Wrap>
		</VStack>
	);
};
