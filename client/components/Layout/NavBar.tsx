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
	useToast,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import { colors } from '../../theme';
import { useUser } from '../UserProvider';
import { useRouter } from 'next/router';
import React from 'react';

export const NavBar: React.FC = () => {
	const { user, logout } = useUser();
	const { colorMode, toggleColorMode } = useColorMode();
	const router = useRouter();
	const toast = useToast();

	const logoutUser = async () => {
		const success = await logout();
		toast({
			description: 'Come back soon!',
			status: 'success',
			variant: 'solid',
			duration: 4000,
			isClosable: true,
			position: 'top',
		});
		router.push('/login');
		if (!success) {
			toast({
				description: 'Unable to log out',
				status: 'error',
				variant: 'solid',
				duration: 4000,
				isClosable: true,
				position: 'top',
			});
		}
	};

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
									{user ? (
										<>
											<Center>
												<Heading py={5} size="md">
													{user?.username}
												</Heading>
											</Center>
											<MenuDivider />
											<MenuItem>Counts</MenuItem>
											<MenuItem>Groups</MenuItem>
											<MenuItem>New Count</MenuItem>
											<MenuItem onClick={logoutUser}>
												Log out
											</MenuItem>
										</>
									) : (
										<>
											<MenuItem
												onClick={() =>
													router.push('/login')
												}
											>
												Log In
											</MenuItem>
											<MenuItem
												onClick={() =>
													router.push('/sign-up')
												}
											>
												Sign Up
											</MenuItem>
										</>
									)}
								</MenuList>
							</Menu>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
};
