import Category from "../entities/category.entity";
import { CustomError } from "../middlewares/error/error.middleware";
import { CategoryRepository } from "../repositories/category.repository";
import { CreateCategory, UpdateCategoryWithId } from "../types/category.type";

export class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.getAllCategories();
  }

  async createCategory(newCategoryInfo: CreateCategory): Promise<Category> {
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
    updatedInfoWithId: UpdateCategoryWithId,
  ): Promise<Category> {
    const { id, ...restInfo } = updatedInfoWithId;

    const foundCategory = await this.categoryRepository.findCategoryById(id);
    if (!foundCategory) throw new CustomError(404, "Category does not exist.");

    await this.categoryRepository.updateCategory(updatedInfoWithId);

    const updatedCategory = await this.categoryRepository.findCategoryById(id);
    if (!updatedCategory)
      throw new CustomError(404, "Updated category not found.");

    return updatedCategory;
  }

  async removeCategory(categoryId: string) {
    const foundCategory =
      await this.categoryRepository.findCategoryById(categoryId);
    if (!foundCategory) throw new CustomError(404, "Category does not exist.");

    return this.categoryRepository.removeCategory(categoryId);
  }
}
