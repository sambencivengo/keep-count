import { Router } from 'express';
import { counts } from './counts';
import { groups } from './groups';
import { users } from './users';

export const api = Router({ mergeParams: true });

api.use('/counts', counts);
api.use('/users', users);
api.use('/groups', groups);
