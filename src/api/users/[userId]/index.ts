import { Router } from 'express';
import { get } from './get';

export const userId = Router();

userId.get('', get);
