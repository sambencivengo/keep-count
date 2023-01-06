import { User } from '@prisma/client';
import { type } from 'os';

type UserOnRequest = Omit<User, 'password'>;

declare global {
	namespace Express {
		export interface Request {
			/**
			 * This will only be populated if the corresponding middleware populates these values first
			 */
			user: UserOnRequest;
		}
	}
}
