import { Router } from 'express';
import { get } from './get';
import { post } from './post';

export const counts = Router();

counts.get('', get);
counts.post('', post);
