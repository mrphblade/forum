import { body } from 'express-validator';

export const createPostValidation = [body('content').notEmpty()];
export const updatePostValidation = [body('content').notEmpty()];
