import { Router } from 'express';
import PostController from '@controllers/post.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import {
  createPostValidation,
  updatePostValidation,
} from '@middlewares/post.validator.middleware';
import validateMiddleware from '@middlewares/validate.middleware';

const r = Router();

r.get('/topic/:id', PostController.getByTopic);
r.get('/:id', PostController.getOne);
r.post(
  '/topic/:id',
  AuthMiddleware,
  createPostValidation,
  validateMiddleware,
  PostController.create,
);
r.put(
  '/:id',
  AuthMiddleware,
  updatePostValidation,
  validateMiddleware,
  PostController.update,
);
r.delete('/:id', AuthMiddleware, PostController.delete);

export default r;
