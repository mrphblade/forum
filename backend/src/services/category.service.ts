import CategoryRepository from '@repositories/category.repository';
import ApiError from '@errors/api.error';

export default class CategoryService {
  static async getAll() {
    return await CategoryRepository.getAll();
  }
  static async getOne(id: number) {
    const category = await CategoryRepository.getOne(id);
    if (!category) {
      throw ApiError.notFound(`Category with id ${id} not found`);
    }
    return category;
  }
  static async create(title: string, description: string) {
    if (!title) {
      throw ApiError.badRequest('Title is required');
    }
    return await CategoryRepository.create(title, description);
  }
  static async update(id: number, title: string, description: string) {
    return await CategoryRepository.update(id, title, description);
  }
  static async delete(id: number) {
    return await CategoryRepository.delete(id);
  }
}
