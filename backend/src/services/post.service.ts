import PostRepository from '@repositories/post.repository';
import ApiError from '@errors/api.error';

export default class PostService {
  static async getByTopic(topicId: number) {
    return await PostRepository.getByTopic(topicId);
  }
  static async getOne(id: number) {
    return await PostRepository.getOne(id);
  }
  static async create(content: string, authorId: number, topicId: number) {
    if (!content) {
      throw ApiError.badRequest('Content is required');
    }
    return await PostRepository.create(content, authorId, topicId);
  }
  static async update(id: number, authorId: number, content: string) {
    return await PostRepository.update(id, authorId, content);
  }
  static async delete(id: number, authorId: number) {
    return await PostRepository.delete(id, authorId);
  }
}
