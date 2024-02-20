import { Repository } from "typeorm";
import { Tag } from "../entities/tag.entity";
import { myDataSource } from "../data-source";
import { TCreateTag, TUpdateTag } from "../types/tag.type";
import { CustomError } from "../middlewares/error.middleware";
import { PossibleNull } from "../types/common.type";

export class TagRepository {
  private tag: Repository<Tag>;
  constructor() {
    this.tag = myDataSource.getRepository(Tag);
  }

  async getOneTagById(id: string): Promise<Tag> {
    const foundTag = await this.tag.findOneBy({ id });
    if (!foundTag) throw new CustomError(400, "Original tag not found.");

    return foundTag;
  }

  async getOneTagByTitle(title: string): Promise<PossibleNull<Tag>> {
    const foundTag = await this.tag.findOneBy({ title });
    if (!foundTag) return null;

    return foundTag;
  }

  async createTag(newTagInfo: TCreateTag): Promise<Tag> {
    const createdTag = this.tag.create(newTagInfo);
    if (!createdTag) throw new CustomError(404, "Create tag failed.");

    await this.tag.save(createdTag);

    return createdTag;
  }

  async updateTag(id: string, updatedTagInfo: TUpdateTag) {
    const updateResult = await this.tag.update(id, updatedTagInfo);
    if (!updateResult.affected)
      throw new CustomError(404, "Update tag failed: 0 affected.");

    return;
  }

  async removeTag(id: string) {
    const deleteResult = await this.tag.delete(id);
    if (!deleteResult)
      throw new CustomError(404, "Delete tag failed: 0 affected.");

    return;
  }

  async getAllTag(): Promise<Tag[]> {
    const foundTags = await this.tag.find();
    if (foundTags === undefined)
      throw new CustomError(404, "Get all tags failed");

    return foundTags;
  }

  async saveArticleId(title: string, articleId: string) {
    const foundTag = await this.getOneTagByTitle(title);
    if (!foundTag) throw new CustomError(404, "Tag not found.");

    foundTag.articles.push(articleId);

    await this.tag.save(foundTag);
  }
}
