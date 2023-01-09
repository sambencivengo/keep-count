import { ReactNode } from 'react';
import {
	Box,
	Flex,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useColorModeValue,
	Stack,
	useColorMode,
	Icon,
	Center,
	Heading,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import { colors } from '../../theme';
import { useUser } from '../UserProvider';

export default function NavBar() {
	const { user } = useUser();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Box
				bgColor={useColorModeValue(
					colors.lightGrey,
					colors.darkBlueGrey
				)}
				px={4}
				borderBottom={`3px solid ${useColorModeValue(
					colors.darkBlueGrey,
					colors.lightGrey
				)}`}
			>
				<Flex
					h={12}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Box>
						<Heading size="md">Keep Count</Heading>
					</Box>

					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Button onClick={toggleColorMode}>
								{colorMode === 'light' ? (
									<MoonIcon />
								) : (
									<SunIcon />
								)}
							</Button>

							<Menu>
								<MenuButton
									as={Button}
									rounded={'md'}
									variant={'link'}
									cursor={'pointer'}
									minW={0}
								>
									<Icon as={HamburgerIcon} />
								</MenuButton>
								<MenuList alignItems={'center'}>
									<Center>
										<Heading py={5} size="md">
											{user?.username}
										</Heading>
									</Center>
									<MenuDivider />
									<MenuItem>Counts</MenuItem>
									<MenuItem>Groups</MenuItem>
									<MenuItem>New Count</MenuItem>
								</MenuList>
							</Menu>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
