import { TagRepository } from "../repositories/tag.repository";

export class TagService {
  private tagRepository: TagRepository;
  constructor() {
    this.tagRepository = new TagRepository();
  }
}
