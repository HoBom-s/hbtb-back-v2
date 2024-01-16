import { Request, NextFunction, Response } from "express";
import { TagService } from "../services/tag.service";
import { CustomError } from "../middlewares/error.middleware";
import { TCreateTag, TUpdateTag } from "../types/tag.type";

export class TagController {
  private tagService: TagService;
  constructor() {
    this.tagService = new TagService();
  }

  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const newTagInfo: TCreateTag = req.body;
      if (!newTagInfo) throw new CustomError(400, "Please check the fields.");
      const createdTag = await this.tagService.createTag(newTagInfo);
      return res.json({
        status: 201,
        message: "Create tag success.",
        data: createdTag,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateTagInfo: TUpdateTag = req.body;
      if (!id || !updateTagInfo)
        throw new CustomError(400, "Update tag failed.");
      await this.tagService.updateTag(id, updateTagInfo);
      return res.json({
        status: 201,
        message: "Update tag success.",
      });
    } catch (error) {
      next(error);
    }
  }

  async removeTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new CustomError(400, "Please check the id.");
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
