import { Request, NextFunction, Response } from "express";
import { TagService } from "../services/tag.service";
import { CustomError } from "../middlewares/error.middleware";
import { TUpdateTag } from "../types/tag.type";
import { Auth } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";
import validateDto from "../utils/dto.util";
import CreateTagRequestDto from "../dtos/tag/createTagRequest.dto";
import sendResponse from "../utils/response.util";

export class TagController {
  private tagService: TagService;
  private authHelper: AuthHelper;
  constructor() {
    this.tagService = new TagService();
    this.authHelper = new AuthHelper();
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
      const updateTagInfo: TUpdateTag = req.body;
      if (!id || !updateTagInfo)
        throw new CustomError(
          400,
          "Error: Required request data missing. Please provide either the request body or the necessary parameters in the request.",
        );

      await this.tagService.updateTag(id, updateTagInfo);

      return res.json({
        status: 201,
        message: "Update tag success.",
        data: { reissuedAccessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id)
        throw new CustomError(
          400,
          "Error: Required parameter missing. Please ensure that all required parameters are provided.",
        );
      await this.tagService.removeTag(id);
      return res.json({
        status: 201,
        message: "Delete tag success.",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllTags(req: Request, res: Response, next: NextFunction) {
    try {
      const foundTags = await this.tagService.getAllTags();

      return res.json({
        status: 200,
        message: "Get all tags success.",
        data: foundTags,
      });
    } catch (error) {
      next(error);
    }
  }
}
