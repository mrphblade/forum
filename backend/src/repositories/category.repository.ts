import { Category } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export default class CategoryRepository {
  static async getAll(): Promise<Category[]> {
    return client.category.findMany();
  }

  static async getOne(id: number): Promise<Category | null> {
    return client.category.findUnique({ where: { id } });
  }

  static async create(title: string, description: string): Promise<Category> {
    return client.category.create({ data: { title, description } });
  }

  static async update(
    id: number,
    title: string,
    description: string,
  ): Promise<Category> {
    return client.category.update({
      where: { id },
      data: { title, description },
    });
  }

  static async delete(id: number): Promise<void> {
    await client.category.delete({ where: { id } });
  }
}
