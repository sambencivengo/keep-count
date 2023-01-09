import { Router } from 'express';
import { post } from './post';
import { login } from './login';
import { me } from './me';
import { logout } from './logout';
import { userMiddleware } from '../../utils/userMiddleware';

export const users = Router({ mergeParams: true });

users.post('', post);
users.post('/login', login);
users.use(userMiddleware);
users.get('/me', me);
users.delete('', logout);
