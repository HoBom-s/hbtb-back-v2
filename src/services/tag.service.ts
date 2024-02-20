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

    const foundTag = await this.tagRepository.getOneTagByTitle(title);
    if (foundTag) throw new CustomError(400, "Tag already exists.");

    return this.tagRepository.createTag(newTagInfo);
  }

  async updateTag(tagId: string, updatedTagInfo: TUpdateTag): Promise<Tag> {
    await this.tagRepository.getOneTagById(tagId);
    await this.tagRepository.updateTag(tagId, updatedTagInfo);

    const updatedTag = await this.tagRepository.getOneTagById(tagId);

    return updatedTag;
  }

  async removeTag(tagId: string) {
    await this.tagRepository.getOneTagById(tagId);
    return this.tagRepository.removeTag(tagId);
  }

  getAllTags(): Promise<Tag[]> {
    return this.tagRepository.getAllTags();
  }

  async saveArticleId(tags: string[], createdArticleId: string) {
    for (const tag of tags) {
      await this.tagRepository.saveArticleId(tag, createdArticleId);
    }
  }
}
