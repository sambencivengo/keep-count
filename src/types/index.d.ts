import { User } from '@prisma/client';
import { type } from 'os';

type UserOnRequest = Omit<User, 'password'>;

declare global {
	namespace Express {
		export interface Request {
			user: UserOnRequest;
		}
	}
}
