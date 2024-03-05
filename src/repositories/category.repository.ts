import { Repository } from "typeorm";
import Category from "../entities/category.entity";
import { myDataSource } from "../data-source";
import { CustomError } from "../middlewares/error.middleware";
import {
  CreateCategoryWithIndex,
  UpdateCategoryWithId,
} from "../types/category.type";
import { PossibleNull } from "../types/common.type";

export class CategoryRepository {
  private category: Repository<Category>;

  constructor() {
    this.category = myDataSource.getRepository(Category);
  }

  async getAllCategories(): Promise<Category[]> {
    const allCategories = await this.category.find();
    if (allCategories === undefined)
      throw new CustomError(404, "Get all categories failed.");

    return allCategories;
  }

  async findCategoryByTitle(title: string): Promise<PossibleNull<Category>> {
    const foundCategory = await this.category.findOneBy({ title });
    if (!foundCategory) return null;

    return foundCategory;
  }

  async findCategoryById(id: string): Promise<PossibleNull<Category>> {
    const foundCategory = await this.category.findOneBy({ id });
    if (!foundCategory) return null;
    return foundCategory;
  }

  async createCategory(
    newCategoryInfo: CreateCategoryWithIndex,
  ): Promise<Category> {
    const createdCategory = this.category.create(newCategoryInfo);
    if (!createdCategory) throw new CustomError(404, "Create category failed.");

    await this.category.save(createdCategory);

    return createdCategory;
  }

  async updateCategory(updatedInfoWithId: UpdateCategoryWithId) {
    const { id, ...updatedInfo } = updatedInfoWithId;

    const updateResult = await this.category.update(id, updatedInfo);
    if (!updateResult.affected)
      throw new CustomError(404, "Update category failed: 0 affected.");

    return;
  }

  async removeCategory(id: string) {
    const deleteResult = await this.category.delete(id);
    if (!deleteResult.affected)
      throw new CustomError(404, "Category delete failed: 0 affected.");

    return;
  }

  async getMaxIndex(): Promise<number> {
    const maxIndex = await this.category.maximum("sortIndex", {});
    if (!maxIndex) return 0;
    return maxIndex;
  }
}
