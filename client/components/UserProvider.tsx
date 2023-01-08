import { User } from '@prisma/client';
import React from 'react';
import { baseUrl } from '../constants';

interface UserProviderProps {
	children: React.ReactNode;
}

interface SignUpArgs {
	username: string;
	password: string;
}
interface UserContextData {
	isLoading: boolean;
	user: User | null;
	signUp: (a: SignUpArgs) => Promise<boolean>;
}

const UserContext = React.createContext<UserContextData>({
	user: null,
	isLoading: false,
	signUp: async () => false,
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [user, setUser] = React.useState<User | null>(null);

	const signUp = async ({
		username,
		password,
	}: SignUpArgs): Promise<boolean> => {
		setIsLoading(true);

		try {
			const res = await fetch(`${baseUrl}api/users`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
				credentials: 'include',
			});

			if (!res.ok) {
				setUser(null);
				setIsLoading(false);
				return false;
			}
			const data = await res.json();
			setUser(data);
			setIsLoading(false);

			return true;
		} catch (error) {
			console.error(error);
			setUser(null);
			setIsLoading(false);
			return false;
		}
	};

	return (
		<UserContext.Provider value={{ signUp, user, isLoading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => React.useContext(UserContext);
