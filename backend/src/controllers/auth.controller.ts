import AuthService from '@services/auth.service';
import { Request, Response, NextFunction } from 'express';

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const user = await this.authService.register(name, email, password);

      res.status(201).json({ user, msg: 'User registered successfully.' });
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { login, password } = req.body;

      const tokens = await this.authService.login(login, password);

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

  async refreshTokens(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.cookies['refreshToken'];

      const tokens = await this.authService.refreshTokens(refreshToken);

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

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies['refreshToken'];

      await this.authService.logout(refreshToken);

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
