import { Request, NextFunction, Response } from "express";
import { TagService } from "../services/tag.service";
import { CustomError } from "../middlewares/error.middleware";
import validateDto from "../utils/dto.util";
import CreateTagRequestDto from "../dtos/tag/createTagRequest.dto";
import sendResponse from "../utils/response.util";
import UpdateTagRequestDto from "../dtos/tag/updateTagRequest.dto";
import Tag from "../entities/tag.entity";
import { Auth } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";
import CacheHelper from "../helpers/cache.helper";

export class TagController {
  private tagService: TagService;

  private authHelper: AuthHelper;

  private cacheHelper: CacheHelper;

  constructor() {
    this.tagService = new TagService();
    this.authHelper = new AuthHelper();
    this.cacheHelper = new CacheHelper();
  }

  async createTag(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );

      const createTagRequestDto = await validateDto(
        req.body,
        CreateTagRequestDto,
      );

      if (!createTagRequestDto)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const createdTag = await this.tagService.createTag(createTagRequestDto);

      await this.cacheHelper.delCache("tags");

      return sendResponse(res, 201, "Create tag success.", {
        createdTag,
        reissuedAccessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTag(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );

      const { id } = req.params;

      const updateTagRequestDto: UpdateTagRequestDto = await validateDto(
        req.body,
        UpdateTagRequestDto,
      );

      if (!id || !updateTagRequestDto)
        throw new CustomError(
          400,
          "Error: Required request data missing. Please provide either the request body or the necessary parameters in the request.",
        );

      const updatedTag: Tag = await this.tagService.updateTag(
        id,
        updateTagRequestDto,
      );

      await this.cacheHelper.delCache("tags");

      return sendResponse(res, 201, "Update tag success.", {
        updatedTag,
        reissuedAccessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeTag(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );

      if (!id)
        throw new CustomError(
          400,
          "Error: Required parameter missing. Please ensure that all required parameters are provided.",
        );

      await this.tagService.removeTag(id);

      return sendResponse(res, 201, "Delete tag success.", {
        reissuedAccessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllTags(req: Request, res: Response, next: NextFunction) {
    try {
      const foundTags = await this.tagService.getAllTags();

      await this.cacheHelper.setCache(req, { foundTags });

      return sendResponse(res, 200, "Get all tags success.", { foundTags });
    } catch (error) {
      next(error);
    }
  }
}
