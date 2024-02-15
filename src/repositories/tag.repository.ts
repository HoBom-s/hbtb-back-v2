import { Repository } from "typeorm";
import { Tag } from "../entities/tag.entity";
import { myDataSource } from "../data-source";
import { TCreateTag, TUpdateTag } from "../types/tag.type";
import { CustomError } from "../middlewares/error.middleware";

export class TagRepository {
  private tag: Repository<Tag>;
  constructor() {
    this.tag = myDataSource.getRepository(Tag);
  }

  async getTagById(id: string): Promise<Tag | boolean> {
    const foundTag = await this.tag.findOneBy({ id });
    if (!foundTag) return false;
    return foundTag;
  }

  async getTagByTitle(title: string): Promise<Tag | boolean> {
    const foundTag = await this.tag.findOneBy({ title });
    if (foundTag) return foundTag;
    return false;
  }

  async createTag(newTagInfo: TCreateTag): Promise<Tag> {
    const createdTag = this.tag.create(newTagInfo);
    if (!createdTag) throw new CustomError(400, "Create tag failed.");
    await this.tag.save(createdTag);
    return createdTag;
  }

  async updateTag(id: string, updatedTagInfo: TUpdateTag) {
    const updatedResult = await this.tag.update({ id }, updatedTagInfo);
    if (!updatedResult) throw new CustomError(400, "Update tag failed.");
    return true;
  }

  async removeTag(id: string) {
    const deletedResult = await this.tag.delete(id);
    if (!deletedResult) throw new CustomError(400, "Delete tag failed.");
    return true;
  }

  async getAllTag(): Promise<Tag[]> {
    const foundTags = await this.tag.find({});
    if (!foundTags) throw new CustomError(400, "Get all tags failed");
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
      throw new CustomError(400, "Tag not found.");
    foundTag.articles.push(articleId);
    await this.tag.save(foundTag);
  }
}
