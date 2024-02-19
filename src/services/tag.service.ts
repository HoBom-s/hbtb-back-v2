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
    await this.tagRepository.getTagById(tagId);

    // WIP : UpdateResult _ update 전면수정

    return this.tagRepository.updateTag(tagId, updatedTagInfo);
  }

  async removeTag(tagId: string) {
    await this.tagRepository.getTagById(tagId);
    return this.tagRepository.removeTag(tagId);
  }

  getAllTag() {
    return this.tagRepository.getAllTag();
  }

  async getOneTagByTitle(title: string): Promise<Tag | boolean> {
    const foundTag = await this.tagRepository.getOneTagByTitle(title);
    if (typeof foundTag === "boolean") return false;
    return foundTag;
  }

  async saveArticleId(tags: string[], createdArticleId: string) {
    for (const tag of tags) {
      await this.tagRepository.saveArticleId(tag, createdArticleId);
    }
  }
}
