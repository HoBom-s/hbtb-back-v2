import { NextFunction, Response } from "express";
import { TagService } from "../services/tag.service";

export class TagController {
  private tagService: TagService;
  constructor() {
    this.tagService = new TagService();
  }

  // WIP
  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

/*
getAllTagRequest
createTagRequest
updateTagReqest
deleteTagRequest
 */
