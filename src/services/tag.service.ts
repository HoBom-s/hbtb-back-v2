import CreateTagRequestDto from "../dtos/tag/createTagRequest.dto";
import UpdateTagRequestDto from "../dtos/tag/updateTagRequest.dto";
import Tag from "../entities/tag.entity";
import { CustomError } from "../middlewares/error.middleware";
import { TagRepository } from "../repositories/tag.repository";
import { PossibleNull } from "../types/common.type";

export class TagService {
  private tagRepository: TagRepository;

  constructor() {
    this.tagRepository = new TagRepository();
  }

  getOneTagByTitle(title: string): Promise<PossibleNull<Tag>> {
    return this.tagRepository.getOneTagByTitle(title);
  }

  async createTag(createTagRequestDto: CreateTagRequestDto): Promise<Tag> {
    const { title } = createTagRequestDto;

    const foundTag = await this.tagRepository.getOneTagByTitle(title);

    if (foundTag) throw new CustomError(400, "Tag already exists.");

    return this.tagRepository.createTag(createTagRequestDto);
  }

  async updateTag(
    tagId: string,
    updateTagRequestDto: UpdateTagRequestDto,
  ): Promise<Tag> {
    await this.tagRepository.getOneTagById(tagId);

    await this.tagRepository.updateTag(tagId, updateTagRequestDto);

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
}
