import Category from "../entities/category.entity";
import { CustomError } from "../middlewares/error.middleware";
import { CategoryRepository } from "../repositories/category.repository";
import { TCreateCategory, TUpdateCategoryWithId } from "../types/category.type";

export class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.getAllCategories();
  }

  async createCategory(newCategoryInfo: TCreateCategory): Promise<Category> {
    const { title, ...restInfo } = newCategoryInfo;
    const foundCategory =
      await this.categoryRepository.findCategoryByTitle(title);
    if (foundCategory) throw new CustomError(400, "Category already exists.");

    const existingMaxIndex = await this.categoryRepository.getMaxIndex();
    const newCategoryInfoWithIndex = {
      ...newCategoryInfo,
      sortIndex: existingMaxIndex + 1,
    };

    return this.categoryRepository.createCategory(newCategoryInfoWithIndex);
  }

  async updateCategory(
    updatedInfoWithId: TUpdateCategoryWithId,
  ): Promise<boolean> {
    const { id, ...restInfo } = updatedInfoWithId;
    const foundCategory = await this.categoryRepository.findCategoryById(id);
    if (!foundCategory) throw new CustomError(400, "Category does not exist.");
    return this.categoryRepository.updateCategory(updatedInfoWithId);
  }

  async removeCategory(categoryId: string): Promise<boolean> {
    const foundCategory =
      await this.categoryRepository.findCategoryById(categoryId);
    if (!foundCategory) throw new CustomError(400, "Category does not exist.");
    return this.categoryRepository.removeCategory(categoryId);
  }
}
