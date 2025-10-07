import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import authMiddleware from '@middlewares/auth.middleware';
import validateRequest from '@middlewares/validate.middleware';
import {
  registerValidation,
  loginValidation,
} from '@middlewares/auth.validator.middleware';

const r = Router();

r.post(
  '/register',
  registerValidation,
  validateRequest,
  AuthController.register,
);
r.post('/login', loginValidation, validateRequest, AuthController.login);
r.get('/refresh', AuthController.refreshTokens);
r.delete('/logout', authMiddleware, AuthController.logout);

export default r;
