import { Repository } from "typeorm";
import Category from "../entities/category.entity";
import { myDataSource } from "../data-source";
import { CustomError } from "../middlewares/error.middleware";
import { TCreateCategory, TUpdateCategoryWithId } from "../types/category.type";

export class CategoryRepository {
  private category: Repository<Category>;
  constructor() {
    this.category = myDataSource.getRepository(Category);
  }

  async getAllCategories(): Promise<Category[]> {
    const allCategories = await this.category.find({});
    if (!allCategories)
      throw new CustomError(
        400,
        "Get all categories failed on repository layer.",
      );
    return allCategories;
  }

  async createCategory(newCategoryInfo: TCreateCategory): Promise<Category> {
    const createdCategory = this.category.create(newCategoryInfo);
    if (!createdCategory)
      throw new CustomError(400, "Create category failed on repository layer.");
    await this.category.save(createdCategory);
    return createdCategory;
  }

  async updateCategory(
    updatedInfoWithId: TUpdateCategoryWithId,
  ): Promise<boolean> {
    const { id, ...updatedInfo } = updatedInfoWithId;
    const updatedResult = await this.category.update({ id }, updatedInfo);
    if (!updatedResult)
      throw new CustomError(400, "Update category failed on repository layer.");
    return true;
  }

  async removeCategory(id: string) {
    const deletedResult = await this.category.delete(id);
    if (!deletedResult)
      throw new CustomError(400, "Delete category failed on repository layer.");
    return true;
  }

  async findCategoryByTitle(title: string) {
    const foundCategory = await this.category.findOneBy({ title });
    if (!foundCategory) return false;
    return foundCategory;
  }

  async findCategoryById(id: string) {
    const foundCategory = await this.category.findOneBy({ id });
    if (!foundCategory) return false;
    return foundCategory;
  }
}
