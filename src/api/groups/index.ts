import { Router } from 'express';
import { userMiddleware } from 'src/utils/userMiddleware';
import { get } from './get';

export const groups = Router({ mergeParams: true });

groups.use(userMiddleware);
groups.get('', get);
