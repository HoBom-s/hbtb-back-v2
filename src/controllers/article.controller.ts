import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import { TCreateArticle, TNewArticleInfo } from "../types/article.type";
import { CustomError } from "../middleware/error.middleware";

export class ArticleController {
  private articleService: ArticleService;
  constructor() {
    this.articleService = new ArticleService();
  }

  async createArticle(
    req: Request & { userId?: string },
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.userId;
      if (!userId)
        throw new CustomError(400, "Only the user can write the article.");
      const newArticleInfo: TNewArticleInfo = req.body;
      if (!newArticleInfo)
        throw new CustomError(400, "Please check the fields.");
      const newArticleInfoWithUser: TCreateArticle = {
        ...newArticleInfo,
        userId,
      };
      const createdArticle = await this.articleService.createArticle(
        newArticleInfoWithUser,
      );
      return res.json({
        status: 201,
        message: "Create article success.",
        data: createdArticle,
      });
    } catch (error) {
      next(error);
    }
  }

  async getArticleFindByPath(req: Request, res: Response, next: NextFunction) {
    try {
      const { path } = req.params;
      const foundArticle = this.articleService.getArticleFindByPath(path);
      return res.json({
        status: 200,
        message: "Get article by path success.",
        data: foundArticle,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const allArticles = await this.articleService.getAllArticles();
      return res.json({
        status: 200,
        message: "Get article success.",
        data: allArticles,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedInfo = req.body;
      if (!id || !updatedInfo)
        throw new CustomError(400, "Update article failed.");
      await this.articleService.updateArticle(id, updatedInfo);
      return res.json({
        status: 201,
        message: "Update article success",
      });
    } catch (error) {
      next(error);
    }
  }
}
