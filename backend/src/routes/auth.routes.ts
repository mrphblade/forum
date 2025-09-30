import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import authMiddleware from '@middlewares/auth.middleware';

const controller = new AuthController();

const r = Router();

r.post('/register', controller.register.bind(controller));
r.post('/login', controller.login.bind(controller));
r.get('/refresh', controller.refreshTokens.bind(controller));
r.delete('/logout', authMiddleware, controller.logout.bind(controller));

export default r;
