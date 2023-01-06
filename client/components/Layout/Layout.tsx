import { Center } from '@chakra-ui/react';

interface LayoutProps {
	children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => (
	<Center p={20}>
		<main>{children}</main>
	</Center>
);
