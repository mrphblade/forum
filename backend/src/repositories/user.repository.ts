import { PrismaClient } from '@prisma/client';
import {
  UserCreateInput,
  UserDTO,
  UserUpdateInput,
  User,
} from 'types/user.types';

class UserRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async createUser(user: UserCreateInput): Promise<UserDTO | null> {
    return this.client.user.create({ data: user });
  }

  async findById(id: number): Promise<User | null> {
    return this.client.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.client.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.client.user.findUnique({ where: { username } });
  }

  async updateUser(
    id: number,
    data: Partial<UserUpdateInput>,
  ): Promise<UserDTO | null> {
    return this.client.user.update({ where: { id }, data });
  }

  async deleteUser(id: number): Promise<UserDTO | null> {
    return this.client.user.delete({ where: { id } });
  }
}

export default new UserRepository();
