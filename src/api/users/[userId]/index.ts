import { Router } from 'express';
import { get } from './get';

export const userId = Router({ mergeParams: true });

userId.get('', get);
