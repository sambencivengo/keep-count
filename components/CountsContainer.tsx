import {
	VStack,
	Heading,
	Wrap,
	useToast,
	Center,
	Spinner,
} from '@chakra-ui/react';
import { Count } from '@prisma/client';
import React from 'react';
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
	const [isLoading, setIsLoading] = React.useState(false);
	const toast = useToast();

	const manipulateCount = async ({
		buttonPurpose,
		countId,
	}: ManipulateCountProps): Promise<void> => {
		try {
			const res = await fetch(
				`/api/counts/${countId}?purpose=${buttonPurpose}`,
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
			getCounts(false);
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

	const getCounts = async (initialFetch = true): Promise<void> => {
		if (initialFetch) setIsLoading(true);

		try {
			const res = await fetch(`/api/counts`, {
				credentials: 'include',
			});
			if (!res.ok) {
				toast({
					description: 'Unable to get counts',
					status: 'error',
					variant: 'solid',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});
				if (initialFetch) setIsLoading(false);
				return;
			}

			setCounts(await res.json());
			if (initialFetch) setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};
	React.useEffect(() => {
		getCounts();
	}, []);

	return (
		<VStack gap={5}>
			<Heading>Counts</Heading>
			{isLoading ? (
				<Center>
					<Spinner />
				</Center>
			) : (
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
			)}
		</VStack>
	);
};
