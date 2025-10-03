import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import authMiddleware from '@middlewares/auth.middleware';

const r = Router();

r.post('/register', AuthController.register);
r.post('/login', AuthController.login);
r.get('/refresh', AuthController.refreshTokens);
r.delete('/logout', authMiddleware, AuthController.logout);

export default r;
