import { User } from '@prisma/client';
import React from 'react';

interface UserProviderProps {
	children: React.ReactNode;
}

interface UserContextData {
	isLoading: boolean;
	user: User | null;
}

const UserContext = React.createContext<UserContextData>({
	user: null,
	isLoading: true,
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [user, setUser] = React.useState<User | null>(null);

	return (
		<UserContext.Provider value={{ user, isLoading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => React.useContext(UserContext);
