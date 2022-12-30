import { Router } from 'express';
import { get } from './get';

export const counts = Router();

counts.get('', get);
