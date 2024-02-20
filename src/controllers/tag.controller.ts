import { Request, NextFunction, Response } from "express";
import { TagService } from "../services/tag.service";
import { CustomError } from "../middlewares/error.middleware";
import { TCreateTag, TUpdateTag } from "../types/tag.type";
import { Auth } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";

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
      const newTagInfo: TCreateTag = req.body;
      if (!newTagInfo)
        throw new CustomError(400, "Please check the req.body fields.");

      const createdTag = await this.tagService.createTag(newTagInfo);

      return res.json({
        status: 201,
        message: "Create tag success.",
        data: { createdTag, reissuedAccessToken },
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
        throw new CustomError(400, "Please check req.params and req.body.");

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
      if (!id) throw new CustomError(400, "Please check the req.params.");
      await this.tagService.removeTag(id);
      return res.json({
        status: 201,
        message: "Delete tag success.",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllTag(req: Request, res: Response, next: NextFunction) {
    try {
      const foundTags = await this.tagService.getAllTag();

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
