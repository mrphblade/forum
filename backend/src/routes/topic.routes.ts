import { Router } from 'express';
import TopicController from '@controllers/topic.controller';
import AuthMiddleware from '@middlewares/auth.middleware';

const r = Router();

r.get('/', TopicController.getAll);
r.get('/:id', TopicController.getOne);
r.post('/', AuthMiddleware, TopicController.create);
r.put('/:id', AuthMiddleware, TopicController.update);
r.delete('/:id', AuthMiddleware, TopicController.delete);

export default r;
