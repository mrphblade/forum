import { Router } from 'express';
import CategoryController from '@controllers/category.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import {
  createCategoryValidation,
  updateCategoryValidation,
} from '@middlewares/category.validator.middleware';
import validateMiddleware from '@middlewares/validate.middleware';

const r = Router();

r.get('/', CategoryController.getAll);
r.get('/:id', CategoryController.getOne);
r.post(
  '/',
  AuthMiddleware,
  createCategoryValidation,
  validateMiddleware,
  CategoryController.create,
);
r.put(
  '/:id',
  AuthMiddleware,
  updateCategoryValidation,
  validateMiddleware,
  CategoryController.update,
);
r.delete('/:id', AuthMiddleware, CategoryController.delete);

export default r;
