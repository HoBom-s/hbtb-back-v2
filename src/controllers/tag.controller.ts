import { Request, NextFunction, Response } from "express";
import { TagService } from "../services/tag.service";
import { CustomError } from "../middleware/error.middleware";
import { TCreateTag } from "../types/tag.type";

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
}

/*
() getAllTagRequest
(v) createTagRequest
() updateTagReqest
() deleteTagRequest
 */
