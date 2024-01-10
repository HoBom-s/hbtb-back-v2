import { Request, NextFunction, Response } from "express";
import { TagService } from "../services/tag.service";
import { CustomError } from "../middleware/error.middleware";
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
}

/*
() getAllTagRequest
() deleteTagRequest
 */