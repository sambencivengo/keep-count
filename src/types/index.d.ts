import { User } from '@prisma/client';
import { type } from 'os';
import { UserDTO } from './User';

declare global {
	namespace Express {
		export interface Request {
			user: UserDTO;
		}
	}
}
