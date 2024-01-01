import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import { TCreateArticle } from "../types/article.type";
import { CustomError } from "../middleware/error.middleware";

export class ArticleController {
  private articleService: ArticleService;
  constructor() {
    this.articleService = new ArticleService();
  }

  createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const newArticleInfo: TCreateArticle = req.body;
      if (!newArticleInfo)
        throw new CustomError(400, "Please check the fields of req.body.");
      const createdArticle = this.articleService.createArticle(newArticleInfo);
      return res.json({
        status: 201,
        message: "Create article success.",
        data: createdArticle,
      });
    } catch (error) {
      next(error);
    }
  }
}

/**
    thumbnail?: string | undefined;
    title: string;
    subtitle: string;
    contents: string;
    tags: string[];
    writers: string[];
    path: string;
 */
