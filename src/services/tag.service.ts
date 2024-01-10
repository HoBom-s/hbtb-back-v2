import { Tag } from "../entities/tag.entity";
import { CustomError } from "../middleware/error.middleware";
import { TagRepository } from "../repositories/tag.repository";
import { TCreateTag } from "../types/tag.type";

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
}
