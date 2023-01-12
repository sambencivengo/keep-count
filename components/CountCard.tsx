import { MinusIcon, AddIcon, SettingsIcon } from '@chakra-ui/icons';
import {
	Box,
	VStack,
	Heading,
	Flex,
	IconButton,
	useColorModeValue,
	Tag,
	Center,
	Button,
	HStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { colors } from '../theme';
import {
	ManipulateCountProps,
	CountWithGroupTitleAndId,
} from './CountsContainer';

interface CountCardProps {
	count: CountWithGroupTitleAndId;
	manipulateCount: (a: ManipulateCountProps) => Promise<void>;
	deleteCount: (a: number) => Promise<void>;
}

export const CountCard: React.FC<CountCardProps> = ({
	deleteCount,
	count,
	manipulateCount,
}) => {
	const [isEditing, setIsEditing] = React.useState(false);
	const borderColor = useColorModeValue(
		colors.darkBlueGrey,
		colors.lightGrey
	);
	const [countValueState, setCountValueState] = React.useState(count.value);
	return (
		<Flex
			justifyContent={'space-between'}
			direction="column"
			position={'relative'}
		>
			{count.group ? (
				<Center>
					<Tag
						borderBottomRadius={0}
						bgColor={colors.orange}
						size="lg"
					>
						<Link href={`/group/${count.groupId}`}>
							{count.group.title}
						</Link>
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
					<HStack>
						<Heading textAlign="center" size={'md'}>
							{count.title}
						</Heading>
						<IconButton
							variant="ghost"
							size={'sm'}
							aria-label="Settings Button"
							icon={<SettingsIcon />}
							onClick={() => setIsEditing(!isEditing)}
						/>
					</HStack>
					{isEditing ? (
						<Button
							onClick={() => deleteCount(count.id)}
							size={'sm'}
							bgColor={colors.deepRed}
						>
							Delete
						</Button>
					) : (
						<Flex w="90%" justifyContent="space-between">
							<IconButton
								onClick={() => {
									setCountValueState(countValueState - 1);

									manipulateCount({
										buttonPurpose: 'subtract',
										countId: count.id,
									});
								}}
								fontSize={20}
								aria-label="Minus Symbol Button"
								icon={<MinusIcon />}
							/>
							<Heading size="lg">{countValueState}</Heading>
							<IconButton
								onClick={() => {
									setCountValueState(countValueState + 1);

									manipulateCount({
										buttonPurpose: 'add',
										countId: count.id,
									});
								}}
								fontSize={20}
								aria-label="Plus Symbol Button"
								icon={<AddIcon />}
							/>
						</Flex>
					)}
				</VStack>
			</Box>
		</Flex>
	);
};
