import { Router } from 'express';
import { get } from './get';
import { put } from './put';

export const countId = Router();

countId.get('', get);
countId.put('', put);
