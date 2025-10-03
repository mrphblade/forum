import { PrismaClient } from '@prisma/client';
import {
  UserCreateInput,
  UserDTO,
  UserUpdateInput,
  User,
} from 'types/user.types';

function toDTO(user: User): UserDTO {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}

const client = new PrismaClient();

class UserRepository {
  static async createUser(user: UserCreateInput): Promise<UserDTO> {
    const createdUser = await client.user.create({ data: user });
    return toDTO(createdUser);
  }

  static async findById(id: number): Promise<User | null> {
    return client.user.findUnique({ where: { id } });
  }

  static async findByEmail(email: string): Promise<User | null> {
    return client.user.findUnique({ where: { email } });
  }

  static async findByUsername(username: string): Promise<User | null> {
    return client.user.findUnique({ where: { username } });
  }

  static async updateUser(
    id: number,
    data: Partial<UserUpdateInput>,
  ): Promise<UserDTO> {
    const updatedUser = await client.user.update({ where: { id }, data });
    return toDTO(updatedUser);
  }

  static async deleteUser(id: number): Promise<UserDTO> {
    const deletedUser = await client.user.delete({ where: { id } });
    return toDTO(deletedUser);
  }
}

export default UserRepository;
