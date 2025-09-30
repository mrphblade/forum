import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@utils/token.utils';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken =
      req.headers.authorization?.split(' ')[1] || req.cookies['accessToken'];

    if (!accessToken) {
      return res.status(401).json({ msg: 'No token provided' });
    }

    await verifyAccessToken(accessToken);

    return next();
  } catch (e) {
    res.status(401).json({ msg: 'Unauthorized' });
  }
};
