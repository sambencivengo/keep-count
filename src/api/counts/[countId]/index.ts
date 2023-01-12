import { Router } from 'express';
import { userMiddleware } from '../../../utils/userMiddleware';
import { destroy } from './destroy';
import { get } from './get';
import { put } from './put';

export const countId = Router({ mergeParams: true });

countId.use(userMiddleware);
countId.delete('', destroy);
countId.get('', get);
countId.put('', put);
