import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import {
	Box,
	VStack,
	Heading,
	Flex,
	IconButton,
	useColorModeValue,
	Tag,
	Center,
} from '@chakra-ui/react';
import { Count } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { colors } from '../theme';
import { CountWithGroup, ManipulateCountProps } from './CountsContainer';

interface CountCardProps {
	count: CountWithGroup;
	manipulateCount: (a: ManipulateCountProps) => Promise<void>;
}

export const CountCard: React.FC<CountCardProps> = ({
	count,
	manipulateCount,
}) => {
	const borderColor = useColorModeValue(
		colors.darkBlueGrey,
		colors.lightGrey
	);

	return (
		<Flex
			justifyContent={'space-between'}
			direction="column"
			position={'relative'}
		>
			{count.group ? (
				<Center>
					<Tag bgColor={colors.orange} size="lg">
						<Link href={'/'}>{count.group.title}</Link>
					</Tag>
				</Center>
			) : (
				<Box flex={1} />
			)}
			<Box
				w="300px"
				minH={'200px'}
				rounded="md"
				border={`3px solid ${borderColor}`}
				p={30}
				key={count.id}
			>
				<VStack gap={3}>
					<Heading textAlign="center" size={'md'}>
						{count.title}
					</Heading>
					<Flex w="90%" justifyContent="space-between">
						<IconButton
							onClick={() =>
								manipulateCount({
									buttonPurpose: 'subtract',
									countId: count.id,
								})
							}
							fontSize={20}
							aria-label="Minus Symbol Button"
							icon={<MinusIcon />}
						/>
						<Heading size="lg">{count.value}</Heading>
						<IconButton
							onClick={() =>
								manipulateCount({
									buttonPurpose: 'add',
									countId: count.id,
								})
							}
							fontSize={20}
							aria-label="Plus Symbol Button"
							icon={<AddIcon />}
						/>
					</Flex>
				</VStack>
			</Box>
		</Flex>
	);
};
