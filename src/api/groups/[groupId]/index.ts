import { Router } from 'express';
import { get } from './get';

export const groupId = Router({ mergeParams: true });

groupId.get('', get);
