import { body } from 'express-validator';

export const createCategoryValidation = [
  body('title').notEmpty(),
  body('description').optional().isString(),
];

export const updateCategoryValidation = [
  body('title').optional().notEmpty(),
  body('description').optional().isString(),
];
