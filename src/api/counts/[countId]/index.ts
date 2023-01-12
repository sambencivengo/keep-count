import { Router } from 'express';
import { destroy } from './destroy';
import { get } from './get';
import { put } from './put';

export const countId = Router({ mergeParams: true });

countId.delete('', destroy);
countId.get('', get);
countId.put('', put);
