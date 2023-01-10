import { Router } from 'express';
import { userMiddleware } from '../../utils/userMiddleware';
import { get } from './get';
import { groupId } from './[groupId]';

export const groups = Router({ mergeParams: true });

groups.use(userMiddleware);
groups.get('', get);
groups.use('/:groupId', groupId);
