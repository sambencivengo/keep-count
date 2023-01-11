import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

interface UserProviderProps {
	children: React.ReactNode;
}

interface LoginAndSignUpArgs {
	username: string;
	password: string;
}
interface UserContextData {
	isLoading: boolean;
	user: User | null;
	signUp: (a: LoginAndSignUpArgs) => Promise<boolean>;
	login: (a: LoginAndSignUpArgs) => Promise<boolean>;
	logout: () => Promise<boolean>;
}

const UserContext = React.createContext<UserContextData>({
	user: null,
	isLoading: false,
	signUp: async () => false,
	login: async () => false,
	logout: async () => false,
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [user, setUser] = React.useState<User | null>(null);
	const router = useRouter();

	const getMe = async (): Promise<void> => {
		try {
			const res = await fetch(`/api/users/me`, {
				method: 'GET',
				credentials: 'include',
			});

			if (!res.ok) {
				setUser(null);
				router.push('/login');
			}

			const data = await res.json();
			setUser(data);
		} catch (error) {
			setUser(null);
			console.error(error);
		}
	};

	React.useEffect(() => {
		getMe();
	}, []);

	const login = async ({
		username,
		password,
	}: LoginAndSignUpArgs): Promise<boolean> => {
		setIsLoading(true);

		try {
			const res = await fetch(`/api/users/login`, {
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

	const logout = async (): Promise<boolean> => {
		try {
			await fetch(`/api/users`, { method: 'DELETE' });
			getMe();
			return true;
		} catch (error) {
			console.error('error');
			return false;
		}
	};

	const signUp = async ({
		username,
		password,
	}: LoginAndSignUpArgs): Promise<boolean> => {
		setIsLoading(true);

		try {
			const res = await fetch(`/api/users`, {
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
		<UserContext.Provider
			value={{ signUp, logout, login, user, isLoading }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => React.useContext(UserContext);
