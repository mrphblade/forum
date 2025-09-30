import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import authMiddleware from '@middlewares/auth.middleware';

const controller = new AuthController();

const r = Router();

r.post('/register', controller.register);
r.post('/login', controller.login);
r.get('/refresh', controller.refreshTokens);
r.delete('/logout', authMiddleware, controller.logout);

export default r;
