import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import {
	Box,
	VStack,
	Heading,
	Flex,
	IconButton,
	useColorModeValue,
} from '@chakra-ui/react';
import { Count } from '@prisma/client';
import React from 'react';
import { colors } from '../theme';
import { ManipulateCountProps } from './CountsContainer';

interface CountCardProps {
	count: Count;
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
				<Flex w="100%" justifyContent="space-around">
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
	);
};
