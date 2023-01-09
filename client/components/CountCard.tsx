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

interface CountCardProps {
	count: Count;
}

export const CountCard: React.FC<CountCardProps> = ({ count }) => {
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
						fontSize={20}
						aria-label="Minus Symbol Button"
						icon={<MinusIcon />}
					/>
					<Heading size="lg">{count.value}</Heading>
					<IconButton
						fontSize={20}
						aria-label="Plus Symbol Button"
						icon={<AddIcon />}
					/>
				</Flex>
			</VStack>
		</Box>
	);
};
