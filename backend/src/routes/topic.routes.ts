import { Router } from 'express';
import TopicController from '@controllers/topic.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import {
  createTopicValidation,
  updateTopicValidation,
} from '@middlewares/topic.validator.middleware';
import validateMiddleware from '@middlewares/validate.middleware';

const r = Router();

r.get('/', TopicController.getAll);
r.get('/:id', TopicController.getOne);
r.post(
  '/',
  AuthMiddleware,
  createTopicValidation,
  validateMiddleware,
  TopicController.create,
);
r.put(
  '/:id',
  AuthMiddleware,
  updateTopicValidation,
  validateMiddleware,
  TopicController.update,
);
r.delete('/:id', AuthMiddleware, TopicController.delete);

export default r;
