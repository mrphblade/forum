import { Request, Response, NextFunction } from 'express';
import ApiError from '@errors/api.error';

export default (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  } else {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
