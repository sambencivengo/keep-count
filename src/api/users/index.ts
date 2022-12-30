import { Router } from 'express';
import { post } from './post';

export const users = Router();

users.post('', post);
