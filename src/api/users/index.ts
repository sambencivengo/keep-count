import { Router } from 'express';
import { post } from './post';
import { userId } from './[userId]';

export const users = Router();

users.post('', post);
users.use('/:userId', userId);
