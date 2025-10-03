import { UserDTO, User } from 'types/user.types';
import { JWTPayload, Tokens } from 'types/tokens.types';
import ApiError from '@errors/api.error';
import bcrypt from 'bcrypt';
import emailValidation from '@utils/email.validation';
import { createTokens, verifyRefreshToken } from '@utils/token.utils';
import UserRepository from '@repositories/user.repository';

async function validateRefreshToken(refreshToken: string): Promise<User> {
  if (!refreshToken) throw ApiError.unauthorized('No refresh token provided');

  const payload = (await verifyRefreshToken(refreshToken)) as JWTPayload;
  if (!payload) throw ApiError.unauthorized('Invalid refresh token');

  const user = await UserRepository.findById(payload.id);
  if (!user || user.refreshToken !== refreshToken) {
    throw ApiError.unauthorized('Invalid refresh token');
  }

  return user;
}

export default class AuthService {
  static async register(
    username: string,
    email: string,
    password: string,
  ): Promise<UserDTO> {
    const candidate = await UserRepository.findByEmail(email);

    if (candidate) {
      throw ApiError.badRequest('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    return await UserRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });
  }
  static async login(login: string, password: string): Promise<Tokens> {
    const user = (await emailValidation(login))
      ? await UserRepository.findByEmail(login)
      : await UserRepository.findByUsername(login);

    if (!user) {
      throw ApiError.badRequest('Invalid login or password');
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      throw ApiError.badRequest('Invalid login or password');
    }

    const tokens = await createTokens(user.id, user.role);

    await UserRepository.updateUser(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }
  static async refreshTokens(refreshToken: string): Promise<Tokens> {
    const user = await validateRefreshToken(refreshToken);

    const tokens = await createTokens(user.id, user.role);

    await UserRepository.updateUser(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }
  static async logout(refreshToken: string): Promise<void> {
    const user = await validateRefreshToken(refreshToken);

    await UserRepository.updateUser(user.id, { refreshToken: '' });
  }
}
