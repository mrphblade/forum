import { NextFunction, Request, Response } from 'express';
import CategoryService from '@services/category.service';

export default class CategoryController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAll();
      res.json(categories);
    } catch (e) {
      next(e);
    }
  }
  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params['id']);
      const category = await CategoryService.getOne(id);
      res.json(category);
    } catch (e) {
      next(e);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      const category = await CategoryService.create(title, description);
      res.status(201).json(category);
    } catch (e) {
      next(e);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params['id']);
      const { title, description } = req.body;
      const category = await CategoryService.update(id, title, description);
      res.json(category);
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params['id']);
      await CategoryService.delete(id);
      res.json({ msg: 'Category was successfully deleted.' });
    } catch (e) {
      next(e);
    }
  }
}
