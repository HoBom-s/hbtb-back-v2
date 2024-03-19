import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import {
  CreateArticle,
  NewArticleInfo,
  UpdateArticleBody,
  UpdateArticleInfo,
  isSORTING,
} from "../types/article.type";
import { CustomError } from "../middlewares/error.middleware";
import { Auth } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";
import { MulterFile } from "../types/image.type";
import CacheHelper from "../helpers/cache.helper";

export class ArticleController {
  private articleService: ArticleService;
  private authHelper: AuthHelper;
  private cacheHelper: CacheHelper;

  constructor() {
    this.articleService = new ArticleService();
    this.authHelper = new AuthHelper();
    this.cacheHelper = new CacheHelper();
  }

  async createArticle(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );

      const thumbnail = req.file as MulterFile;
      const newArticleInfo: NewArticleInfo = req.body;

      if (!newArticleInfo)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const newArticleInfoWithUser: CreateArticle = {
        thumbnail,
        userId,
        ...newArticleInfo,
      };

      const createdArticle = await this.articleService.createArticle(
        newArticleInfoWithUser,
      );

      await this.cacheHelper.delCache("articles");

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
      if (!path)
        throw new CustomError(
          400,
          "Error: Required parameter missing. Please ensure that all required parameters are provided.",
        );

      const foundArticle = await this.articleService.getArticleFindByPath(path);

      return res.json({
        status: 200,
        message: "Get article by path success.",
        data: { foundArticle },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const allArticles = await this.articleService.getAllArticles();

      await this.cacheHelper.setCache(req, allArticles);

      return res.json({
        status: 200,
        message: "Get article success.",
        data: { allArticles },
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
      const thumbnail = req.file as MulterFile;
      const updatedBody: UpdateArticleBody = req.body;
      if (!id || !updatedBody)
        throw new CustomError(
          400,
          "Error: Required request data missing. Please provide either the request body or the necessary parameters in the request.",
        );

      const updatedInfo: UpdateArticleInfo = {
        thumbnail,
        ...updatedBody,
      };

      const updatedArticle = await this.articleService.updateArticle(
        id,
        userId,
        updatedInfo,
      );

      await this.cacheHelper.delCache("articles");

      return res.json({
        status: 201,
        message: "Update article success.",
        data: { updatedArticle, reissuedAccessToken },
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
      if (!id)
        throw new CustomError(
          400,
          "Error: Required parameter missing. Please ensure that all required parameters are provided.",
        );

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
      if (!keyword)
        throw new CustomError(
          400,
          "Error: Required query parameter 'keyword' missing. Please include the 'keyword' parameter in your request query.",
        );

      const foundArticles = await this.articleService.searchArticle(
        keyword as string,
      );

      return res.json({
        status: 200,
        message: "Get searched articles success.",
        data: { foundArticles },
      });
    } catch (error) {
      next(error);
    }
  }

  // WIP : caching
  async getArticlePerPage(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageNumber, perPage, sorting } = req.query;
      if (!pageNumber || !perPage)
        throw new CustomError(
          400,
          "Error: Required query parameter 'pageNumber' or 'perPage' missing. Please include the 'pageNumber' or 'perPage' parameter in your request query.",
        );

      const isSortingValid = isSORTING(sorting);
      if (!isSortingValid) {
        throw new CustomError(
          400,
          "Error: Required query parameter 'sorting' should be one of '`asc` | `desc` | undefined'(case-insensitive).",
        );
      }

      const perPageInfo = {
        pageNumber: parseInt(pageNumber as string, 10),
        perPage: parseInt(perPage as string, 10),
        sorting,
      };

      const articlesAndPageCount =
        await this.articleService.getArticlePerPage(perPageInfo);

      await this.cacheHelper.setCache(req, articlesAndPageCount);

      return res.json({
        status: 200,
        message: "Get articles per page success.",
        data: { articlesAndPageCount },
      });
    } catch (error) {
      next(error);
    }
  }
}
