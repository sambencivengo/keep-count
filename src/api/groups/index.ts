import { Router } from 'express';
import { userMiddleware } from '../../utils/userMiddleware';
import { get } from './get';

export const groups = Router({ mergeParams: true });

groups.use(userMiddleware);
groups.get('', get);
