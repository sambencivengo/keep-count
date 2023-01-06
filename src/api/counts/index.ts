import { Router } from 'express';
import { userMiddleware } from '../../utils/userMiddleware';
import { get } from './get';
import { post } from './post';
import { countId } from './[countId]';

export const counts = Router({ mergeParams: true });

counts.use(userMiddleware);
counts.use('/:countId', countId);
counts.get('', get);
counts.post('', post);
