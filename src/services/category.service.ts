import CreateCategoryRequestDto from "../dtos/category/createCategoryRequest.dto";
import UpdateCategoryRequestDto from "../dtos/category/updateCategoryRequest.dto";
import Category from "../entities/category.entity";
import { CustomError } from "../middlewares/error.middleware";
import { CategoryRepository } from "../repositories/category.repository";
import { CreateCategoryWithIndex } from "../types/category.type";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.getAllCategories();
  }

  async createCategory(
    createCategoryRequest: CreateCategoryRequestDto,
  ): Promise<Category> {
    const { title } = createCategoryRequest;

    const foundCategory =
      await this.categoryRepository.findCategoryByTitle(title);

    if (foundCategory) throw new CustomError(400, "Category already exists.");

    const existingMaxIndex = await this.categoryRepository.getMaxIndex();

    const newCategoryInfoWithIndex: CreateCategoryWithIndex = {
      ...createCategoryRequest,
      sortIndex: existingMaxIndex + 1,
    };

    return this.categoryRepository.createCategory(newCategoryInfoWithIndex);
  }

  async updateCategory(
    id: string,
    updateCategoryRequestDto: UpdateCategoryRequestDto,
  ): Promise<Category> {
    const foundCategory = await this.categoryRepository.findCategoryById(id);

    if (!foundCategory) throw new CustomError(404, "Category does not exist.");

    await this.categoryRepository.updateCategory(id, updateCategoryRequestDto);

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
