import { NextFunction, Request, Response } from 'express';
import PostService from '@services/post.service';

export default class PostController {
  static async getByTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const topicId = Number(req.params['id']);
      const posts = await PostService.getByTopic(topicId);
      res.json(posts);
    } catch (e) {
      next(e);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params['id']);
      const post = await PostService.getOne(id);
      res.json(post);
    } catch (e) {
      next(e);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const topicId = Number(req.params['id']);
      const { content } = req.body;
      const authorId = (req as any).user.id;

      const post = await PostService.create(content, authorId, topicId);
      res.status(201).json(post);
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params['id']);
      const { content } = req.body;
      const authorId = (req as any).user.id;

      const post = await PostService.update(id, authorId, content);
      res.json(post);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params['id']);
      const authorId = (req as any).user.id;

      await PostService.delete(id, authorId);
      res.json({ msg: 'Post was successfully deleted.' });
    } catch (e) {
      next(e);
    }
  }
}
