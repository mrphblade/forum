import { body } from 'express-validator';

export const createTopicValidation = [
  body('title').notEmpty(),
  body('description').optional().isString(),
  body('categoryId').isInt(),
];

export const updateTopicValidation = [
  body('title').optional().notEmpty(),
  body('description').optional().isString(),
];
