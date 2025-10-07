import { Post } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export default class PostRepository {
  static async getByTopic(topicId: number): Promise<Post[]> {
    return client.post.findMany({ where: { topicId } });
  }

  static async getOne(id: number): Promise<Post | null> {
    return client.post.findUnique({ where: { id } });
  }

  static async create(
    content: string,
    authorId: number,
    topicId: number,
  ): Promise<Post> {
    return client.post.create({
      data: { content, authorId, topicId },
    });
  }

  static async update(
    id: number,
    authorId: number,
    content: string,
  ): Promise<Post> {
    return client.post.update({ where: { id }, data: { content, authorId } });
  }

  static async delete(id: number, authorId: number): Promise<void> {
    await client.post.delete({ where: { id, authorId } });
  }
}
