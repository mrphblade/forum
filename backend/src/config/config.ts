import dotenv from 'dotenv';
import path from 'path';

if (process.env['NODE_ENV'] === 'development') {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

export const config = {
  app: {
    port: Number(process.env['PORT']) || 8080,
    env: process.env['NODE_ENV'] || 'development',
  },
  jwt: {
    secret: process.env['JWT_SECRET'] || 'default_jwt_secret',
    refreshSecret:
      process.env['JWT_REFRESH_SECRET'] || 'default_refresh_secret',
  },
  db: {
    url:
      process.env['DATABASE_URL'] || 'postgresql://user:pass@localhost:5432/db',
  },
};
