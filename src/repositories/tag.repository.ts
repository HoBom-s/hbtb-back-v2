import { Repository } from "typeorm";
import { Tag } from "../entities/tag.entity";
import { myDataSource } from "../data-source";

export class TagRepository {
  private tag: Repository<Tag>;
  constructor() {
    this.tag = myDataSource.getRepository(Tag);
  }
}
