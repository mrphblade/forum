import { NextFunction, Request, Response } from 'express';
import TopicService from '@services/topic.service';

export default class TopicController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await TopicService.getAll();
      res.json(topics);
    } catch (e) {
      next(e);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params['id']);
      const topic = await TopicService.getOne(id);
      res.json(topic);
    } catch (e) {
      next(e);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, categoryId } = req.body;
      const authorId = (req as any).user.id;

      const topic = await TopicService.create(
        title,
        description,
        authorId,
        categoryId,
      );
      res.status(201).json(topic);
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params['id']);
      const { title, description } = req.body;
      const authorId = (req as any).user.id;

      const topic = await TopicService.update(id, authorId, title, description);
      res.json(topic);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params['id']);
      const authorId = (req as any).user.id;

      await TopicService.delete(id, authorId);
      res.json({ msg: 'Topic was successfully deleted.' });
    } catch (e) {
      next(e);
    }
  }
}
