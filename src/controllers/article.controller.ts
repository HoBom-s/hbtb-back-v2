import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import CreateArticleRequestDto from "../dtos/article/createArticleRequest.dto";
import validateDto from "../utils/dto.util";
import UpdateArticleRequestDto from "../dtos/article/updateArticleRequest.dto";
import sendResponse from "../utils/response.util";
import { isSORTING } from "../types/article.type";
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

      const createArticleRequestDto = await validateDto(
        req.body,
        CreateArticleRequestDto,
      );

      if (!createArticleRequestDto)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const createdArticle = await this.articleService.createArticle(
        userId,
        createArticleRequestDto,
        thumbnail,
      );

      await this.cacheHelper.delCache("articles");

      return sendResponse(res, 201, "Create article success.", {
        createdArticle,
        reissuedAccessToken,
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

      return sendResponse(res, 200, "Get article by path success.", {
        foundArticle,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const allArticles = await this.articleService.getAllArticles();

      await this.cacheHelper.setCache(req, { allArticles });

      return sendResponse(res, 200, "Get article success.", { allArticles });
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

      const updateArticleRequestDto = await validateDto(
        req.body,
        UpdateArticleRequestDto,
      );

      if (!id || !updateArticleRequestDto)
        throw new CustomError(
          400,
          "Error: Required request data missing. Please provide either the request body or the necessary parameters in the request.",
        );

      const updatedArticle = await this.articleService.updateArticle(
        id,
        userId,
        updateArticleRequestDto,
        thumbnail,
      );

      await this.cacheHelper.delCache("articles");

      return sendResponse(res, 201, "Update article success.", {
        updatedArticle,
        reissuedAccessToken,
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

      return sendResponse(res, 201, "Delete article success.", {
        reissuedAccessToken,
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

      return sendResponse(res, 200, "Get searched articles success.", {
        foundArticles,
      });
    } catch (error) {
      next(error);
    }
  }

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

      await this.cacheHelper.setCache(req, { articlesAndPageCount });

      return sendResponse(res, 200, "Get articles per page success.", {
        articlesAndPageCount,
      });
    } catch (error) {
      next(error);
    }
  }
}
