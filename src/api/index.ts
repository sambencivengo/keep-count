import { Router } from 'express';
import { counts } from './counts';

export const api = Router();

api.use('/counts', counts);
