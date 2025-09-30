import jwt from 'jsonwebtoken';
import { JWTPayload, Tokens } from 'types/tokens.types';

const accessSecret = process.env['JWT_SECRET']!;
const refreshSecret = process.env['JWT_REFRESH_SECRET']!;

export async function createTokens(id: number, role: string): Promise<Tokens> {
  const payload: JWTPayload = { id, role };

  const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '30d' });

  return { accessToken, refreshToken };
}

export async function verifyAccessToken(token: string) {
  return jwt.verify(token, accessSecret);
}

export async function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshSecret);
}
