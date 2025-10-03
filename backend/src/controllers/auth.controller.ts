import AuthService from '@services/auth.service';
import { Request, Response, NextFunction } from 'express';

export default class AuthController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const user = await AuthService.register(name, email, password);

      res.status(201).json({ user, msg: 'User registered successfully.' });
    } catch (e) {
      next(e);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { login, password } = req.body;

      const tokens = await AuthService.login(login, password);

      const options = {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
      };

      res
        .status(200)
        .cookie('accessToken', tokens.accessToken, options)
        .cookie('refreshToken', tokens.refreshToken, options)
        .json({ tokens, msg: 'Logged in successfully.' });
    } catch (e) {
      next(e);
    }
  }

  static async refreshTokens(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.cookies['refreshToken'];

      const tokens = await AuthService.refreshTokens(refreshToken);

      const options = {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
      };

      res
        .status(200)
        .cookie('accessToken', tokens.accessToken, options)
        .cookie('refreshToken', tokens.refreshToken, options)
        .json({ tokens, msg: 'Refreshed tokens successfully.' });
    } catch (e) {
      next(e);
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.cookies['refreshToken'];

      await AuthService.logout(refreshToken);

      res
        .status(200)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json({ msg: 'Logged out successfully.' });
    } catch (e) {
      next(e);
    }
  }
}
