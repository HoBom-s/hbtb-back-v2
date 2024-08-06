import CreateTagRequestDto from "../dtos/tag/createTagRequest.dto";
import Tag from "../entities/tag.entity";
import { CustomError } from "../middlewares/error.middleware";
import { TagRepository } from "../repositories/tag.repository";
import { PossibleNull } from "../types/common.type";
import { TUpdateTag } from "../types/tag.type";

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

    return;
  }
}
