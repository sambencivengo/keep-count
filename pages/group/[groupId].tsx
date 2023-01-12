import { Heading, useToast, VStack, Wrap } from '@chakra-ui/react';
import { Group } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { CountCard } from '../../components/CountCard';
import {
	CountWithGroupTitleAndId,
	ManipulateCountProps,
} from '../../components/CountsContainer';

interface GroupWithCountsDTO extends Group {
	counts: CountWithGroupTitleAndId[];
}

const GroupId: NextPage = () => {
	const router = useRouter();
	const { groupId } = router.query;
	const [group, setGroup] = React.useState<GroupWithCountsDTO | null>(null); // TODO: fix types for fetch when time allows
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
			getGroupCounts();
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

	const deleteCount = async (countId: number) => {
		try {
			const res = await fetch(`/api/counts/${countId}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			if (!res.ok) {
				toast({
					description: 'Unable to delete count',
					status: 'error',
					variant: 'solid',
					duration: 4000,
					isClosable: true,
					position: 'top',
				});
				console.error('Unable to delete count');
				return;
			}
			getGroupCounts();
		} catch (error) {
			console.error(error);
		}
	};

	const getGroupCounts = async () => {
		const res = await fetch(`/api/groups/${groupId}`, {
			credentials: 'include',
		});

		if (!res.ok) {
			toast({
				description: 'Unable to get group',
				status: 'error',
				variant: 'solid',
				duration: 4000,
				isClosable: true,
				position: 'top',
			});
			return;
		}
		const data: GroupWithCountsDTO = await res.json();
		setGroup(data);
	};

	React.useEffect(() => {
		if (router.isReady) {
			getGroupCounts();
		}
	}, [router]);

	return (
		<VStack gap={5}>
			{group && (
				<>
					<Heading>{group.title}</Heading>
					<Wrap spacing={10} justify="center">
						{group.counts &&
							group.counts.map((count) => (
								<CountCard
									manipulateCount={manipulateCount}
									key={count.id}
									count={count}
									deleteCount={deleteCount}
								/>
							))}
					</Wrap>
				</>
			)}
		</VStack>
	);
};
export default GroupId;
