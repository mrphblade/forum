import { UserDTO, User } from 'types/user.types';
import { JWTPayload, Tokens } from 'types/tokens.types';
import ApiError from '@errors/api.error';
import bcrypt from 'bcrypt';
import emailValidation from '@utils/email.validation';
import { createTokens, verifyRefreshToken } from '@utils/token.utils';
import UserRepository from '@repositories/user.repository';

export default class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<UserDTO> {
    const candidate = await this.userRepository.findByEmail(email);

    if (candidate) {
      throw ApiError.badRequest('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    return await this.userRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });
  }
  async login(login: string, password: string): Promise<Tokens> {
    const user = (await emailValidation(login))
      ? await this.userRepository.findByEmail(login)
      : await this.userRepository.findByUsername(login);

    if (!user) {
      throw ApiError.badRequest('Invalid login or password');
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      throw ApiError.badRequest('Invalid login or password');
    }

    const tokens = await createTokens(user.id, user.role);

    await this.userRepository.updateUser(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }
  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const user = await this.validateRefreshToken(refreshToken);

    const tokens = await createTokens(user.id, user.role);

    await this.userRepository.updateUser(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }
  async logout(refreshToken: string): Promise<void> {
    const user = await this.validateRefreshToken(refreshToken);

    await this.userRepository.updateUser(user.id, { refreshToken: '' });
  }

  private async validateRefreshToken(refreshToken: string): Promise<User> {
    if (!refreshToken) throw ApiError.unauthorized('No refresh token provided');

    const payload = (await verifyRefreshToken(refreshToken)) as JWTPayload;
    if (!payload) throw ApiError.unauthorized('Invalid refresh token');

    const user = await this.userRepository.findById(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
      throw ApiError.unauthorized('Invalid refresh token');
    }

    return user;
  }
}
