import TopicRepository from '@repositories/topic.repository';

export default class TopicService {
  static async getAll() {
    return await TopicRepository.getAll();
  }
  static async getOne(id: number) {
    return await TopicRepository.getOne(id);
  }
  static async create(
    title: string,
    description: string,
    authorId: number,
    categoryId: number,
  ) {
    return await TopicRepository.create(
      title,
      description,
      authorId,
      categoryId,
    );
  }
  static async update(
    id: number,
    authorId: number,
    title: string,
    description: string,
  ) {
    return await TopicRepository.update(id, authorId, title, description);
  }
  static async delete(id: number, authorId: number) {
    return await TopicRepository.delete(id, authorId);
  }
}
