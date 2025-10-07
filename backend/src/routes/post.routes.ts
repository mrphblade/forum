import { Router } from 'express';
import PostController from '@controllers/post.controller';
import AuthMiddleware from '@middlewares/auth.middleware';

const r = Router();

r.get('/topic/:id', PostController.getByTopic);
r.get('/:id', PostController.getOne);
r.post('/topic/:id', AuthMiddleware, PostController.create);
r.put('/:id', AuthMiddleware, PostController.update);
r.delete('/:id', AuthMiddleware, PostController.delete);

export default r;
