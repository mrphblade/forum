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

  async createUser(user: UserCreateInput): Promise<UserDTO> {
    const createdUser = await this.client.user.create({ data: user });
    return this.toDTO(createdUser);
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
  ): Promise<UserDTO> {
    const updatedUser = await this.client.user.update({ where: { id }, data });
    return this.toDTO(updatedUser);
  }

  async deleteUser(id: number): Promise<UserDTO> {
    const deletedUser = await this.client.user.delete({ where: { id } });
    return this.toDTO(deletedUser);
  }

  private toDTO(user: User): UserDTO {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}

export default UserRepository;
