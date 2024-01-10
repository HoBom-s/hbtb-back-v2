import { Repository } from "typeorm";
import { Tag } from "../entities/tag.entity";
import { myDataSource } from "../data-source";
import { TCreateTag } from "../types/tag.type";
import { CustomError } from "../middleware/error.middleware";

export class TagRepository {
  private tag: Repository<Tag>;
  constructor() {
    this.tag = myDataSource.getRepository(Tag);
  }

  async getTagByTitle(title: string): Promise<boolean | Tag[]> {
    const foundTag = await this.tag.findBy({ title });
    if (foundTag) return foundTag;
    return false;
  }

  async createTag(newTagInfo: TCreateTag): Promise<Tag> {
    const createdTag = this.tag.create(newTagInfo);
    if (!createdTag) throw new CustomError(400, "Create tag failed.");
    await this.tag.save(createdTag);
    return createdTag;
  }
}
