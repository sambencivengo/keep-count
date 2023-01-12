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
	HStack,
	IconButton,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, AddIcon } from '@chakra-ui/icons';
import { colors } from '../../theme';
import { useUser } from '../UserProvider';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

export const NavBar: React.FC = () => {
	const { user, logout, getMe } = useUser();
	const { colorMode, toggleColorMode } = useColorMode();
	const router = useRouter();
	const toast = useToast();

	React.useEffect(() => {
		getMe();
	}, []);

	const logoutUser = async () => {
		const success = await logout();
		if (!success) {
			toast({
				description: 'Unable to log out',
				status: 'error',
				variant: 'solid',
				duration: 4000,
				isClosable: true,
				position: 'top',
			});
			return;
		}
		toast({
			description: 'Come back soon!',
			status: 'success',
			variant: 'solid',
			duration: 4000,
			isClosable: true,
			position: 'top',
		});
		router.push('/login');
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
						<HStack>
							<Link href={user ? '/' : '/login'}>
								<Heading size="md">Keep Count</Heading>
							</Link>
							<IconButton
								size={'sm'}
								rounded={'3xl'}
								fontSize="lg"
								aria-label="New Count Button"
								icon={<AddIcon />}
								onClick={() => {
									router.push('/new-count');
								}}
							/>
						</HStack>
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
											<MenuItem
												onClick={() =>
													router.push('/new-count')
												}
											>
												New Count
											</MenuItem>
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
