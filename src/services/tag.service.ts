import { Tag } from "../entities/tag.entity";
import { CustomError } from "../middlewares/error.middleware";
import { TagRepository } from "../repositories/tag.repository";
import { TCreateTag, TUpdateTag } from "../types/tag.type";

export class TagService {
  private tagRepository: TagRepository;
  constructor() {
    this.tagRepository = new TagRepository();
  }

  async createTag(newTagInfo: TCreateTag): Promise<Tag> {
    const { title, path } = newTagInfo;
    const foundTag = await this.tagRepository.getTagByTitle(title);
    if (foundTag) throw new CustomError(400, "Tag already exists.");
    return this.tagRepository.createTag(newTagInfo);
  }

  async updateTag(tagId: string, updatedTagInfo: TUpdateTag) {
    const foundTag = await this.tagRepository.getTagById(tagId);
    if (!foundTag) throw new CustomError(400, "Original tag not found.");
    return this.tagRepository.updateTag(tagId, updatedTagInfo);
  }

  async removeTag(tagId: string) {
    const foundTag = await this.tagRepository.getTagById(tagId);
    if (!foundTag) throw new CustomError(400, "Original tag not found.");
    return this.tagRepository.removeTag(tagId);
  }

  getAllTag() {
    return this.tagRepository.getAllTag();
  }
}
