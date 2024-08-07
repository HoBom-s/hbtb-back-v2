import { Repository } from "typeorm";
import Tag from "../entities/tag.entity";
import { myDataSource } from "../data-source";
import { CustomError } from "../middlewares/error.middleware";
import { PossibleNull } from "../types/common.type";
import CreateTagRequestDto from "../dtos/tag/createTagRequest.dto";
import UpdateTagRequestDto from "../dtos/tag/updateTagRequest.dto";

export class TagRepository {
  private tag: Repository<Tag>;
  constructor() {
    this.tag = myDataSource.getRepository(Tag);
  }

  async getOneTagById(id: string): Promise<Tag> {
    const foundTag = await this.tag.findOneBy({ id });

    if (!foundTag) throw new CustomError(404, "Original tag not found.");

    return foundTag;
  }

  async getOneTagByTitle(title: string): Promise<PossibleNull<Tag>> {
    const foundTag = await this.tag.findOneBy({ title });

    if (!foundTag) return null;

    return foundTag;
  }

  async createTag(createTagRequestDto: CreateTagRequestDto): Promise<Tag> {
    const createdTag = this.tag.create(createTagRequestDto);

    if (!createdTag) throw new CustomError(404, "Create tag failed.");

    await this.tag.save(createdTag);

    return createdTag;
  }

  async updateTag(id: string, updateTagRequestDto: UpdateTagRequestDto) {
    const updateResult = await this.tag.update(id, updateTagRequestDto);

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

  async getAllTags(): Promise<Tag[]> {
    const foundTags = await this.tag.find();

    if (foundTags === undefined)
      throw new CustomError(404, "Get all tags failed");

    return foundTags;
  }
}
