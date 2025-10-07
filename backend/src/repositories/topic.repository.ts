import { Topic } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export default class TopicRepository {
  static async getAll(): Promise<Topic[]> {
    return client.topic.findMany();
  }

  static async getOne(id: number): Promise<Topic | null> {
    return client.topic.findUnique({ where: { id } });
  }

  static async create(
    title: string,
    description: string,
    authorId: number,
    categoryId: number,
  ): Promise<Topic> {
    return client.topic.create({
      data: { title, description, authorId, categoryId },
    });
  }

  static async update(
    id: number,
    authorId: number,
    title: string,
    description: string,
  ): Promise<Topic> {
    return client.topic.update({
      where: { id, authorId },
      data: { title, description },
    });
  }

  static async delete(id: number, authorId: number): Promise<void> {
    await client.topic.delete({ where: { id, authorId } });
  }
}
