import { Repository, UpdateResult } from "typeorm";
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

  async getTagById(id: string): Promise<PossibleNull<Tag>> {
    const foundTag = await this.tag.findOneBy({ id });
    if (!foundTag) throw new CustomError(400, "Original tag not found.");

    return foundTag;
  }

  async getTagByTitle(title: string): Promise<PossibleNull<Tag>> {
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

  updateTag(id: string, updatedTagInfo: TUpdateTag): Promise<UpdateResult> {
    return this.tag.update(id, updatedTagInfo);
  }

  async removeTag(id: string) {
    const deletedResult = await this.tag.delete(id);
    if (!deletedResult) throw new CustomError(404, "Delete tag failed.");
    return true;
  }

  async getAllTag(): Promise<PossibleNull<Tag[]>> {
    const foundTags = await this.tag.find();
    if (foundTags === undefined)
      throw new CustomError(404, "Get all tags failed");

    return foundTags;
  }

  async getOneTagByTitle(title: string): Promise<Tag | boolean> {
    const foundTag = await this.tag.findOne({ where: { title } });
    if (!foundTag) return false;
    return foundTag;
  }

  async saveArticleId(title: string, articleId: string) {
    const foundTag = await this.getOneTagByTitle(title);
    if (typeof foundTag === "boolean")
      throw new CustomError(404, "Tag not found.");
    foundTag.articles.push(articleId);
    await this.tag.save(foundTag);
  }
}
