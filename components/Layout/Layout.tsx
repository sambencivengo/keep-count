import { Center } from '@chakra-ui/react';
import { NavBar } from './NavBar';

interface LayoutProps {
	children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => (
	<>
		<NavBar />
		<Center px={10} pt={20}>
			<main>{children}</main>
		</Center>
	</>
);
