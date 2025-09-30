import { Router } from 'express';
import AuthController from '@controllers/auth.controller';

const controller = new AuthController();

const r = Router();

r.post('/register', controller.register);
r.post('/login', controller.login);
r.get('/refresh', controller.refreshTokens);
r.delete('/logout', controller.logout);

export default r;
