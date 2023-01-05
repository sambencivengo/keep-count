import { Router } from 'express';
import { post } from './post';
import { login } from './login';
import { userId } from './[userId]';

export const users = Router({ mergeParams: true });

users.post('/', post);
users.post('/login', login);
users.use('/:userId', userId);
