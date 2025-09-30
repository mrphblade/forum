import { JwtPayload } from 'jsonwebtoken';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload extends JwtPayload {
  id: number;
  role: string;
}
