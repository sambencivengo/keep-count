import { Router } from 'express';
import { get } from './get';
import { put } from './put';

export const countId = Router({ mergeParams: true });

countId.get('', get);
countId.put('', put);
