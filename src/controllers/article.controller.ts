import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import {
  TCreateArticle,
  TNewArticleInfo,
  TUpdateArticle,
} from "../types/article.type";
import { CustomError } from "../middlewares/error.middleware";
import { Auth } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";

export class ArticleController {
  private articleService: ArticleService;
  private authHelper: AuthHelper;

  constructor() {
    this.articleService = new ArticleService();
    this.authHelper = new AuthHelper();
  }

  async createArticle(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );

      const newArticleInfo: TNewArticleInfo = req.body;
      if (!newArticleInfo)
        throw new CustomError(400, "Please check req.body fields.");

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
        data: { createdArticle, reissuedAccessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  async getArticleFindByPath(req: Request, res: Response, next: NextFunction) {
    try {
      const { path } = req.params;
      if (!path) throw new CustomError(400, "Missing req.params.");

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

  async updateArticle(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );
      const { id } = req.params;
      const updatedInfo: TUpdateArticle = req.body;
      if (!id || !updatedInfo)
        throw new CustomError(400, "Please check req.params and req.body.");

      await this.articleService.updateArticle(id, userId, updatedInfo);

      return res.json({
        status: 201,
        message: "Update article success.",
        data: { reissuedAccessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeArticle(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );
      const { id } = req.params;
      if (!id) throw new CustomError(400, "Missing req.params.");

      await this.articleService.removeArticle(id, userId);

      return res.json({
        status: 201,
        message: "Delete article success.",
        data: { reissuedAccessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  async searchArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const { keyword } = req.query;
      if (!keyword) throw new CustomError(400, "Missing keyword.");

      const foundArticles = await this.articleService.searchArticle(
        keyword as string,
      );

      return res.json({
        status: 200,
        message: "Get searched articles success.",
        data: foundArticles,
      });
    } catch (error) {
      next(error);
    }
  }

  async getArticlePerPage(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageNumber, perPage } = req.query;
      if (!pageNumber || !perPage)
        throw new CustomError(400, "Please check pageNumber & perPage.");

      const articlesAndPageCount = await this.articleService.getArticlePerPage(
        pageNumber as string,
        perPage as string,
      );

      return res.json({
        status: 200,
        message: "Get articles per page success.",
        data: articlesAndPageCount,
      });
    } catch (error) {
      next(error);
    }
  }
}
