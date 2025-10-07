import { Router } from 'express';
import CategoryController from '@controllers/category.controller';
import AuthMiddleware from '@middlewares/auth.middleware';

const r = Router();

r.get('/', CategoryController.getAll);
r.get('/:id', CategoryController.getOne);
r.post('/', AuthMiddleware, CategoryController.create);
r.put('/:id', AuthMiddleware, CategoryController.update);
r.delete('/:id', AuthMiddleware, CategoryController.delete);

export default r;
