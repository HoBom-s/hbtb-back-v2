import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { CustomError } from "../middlewares/error.middleware";
import { TUpdateCategory, TUpdateCategoryWithId } from "../types/category.type";

export class CategoryController {
  private categoryService: CategoryService;
  constructor() {
    this.categoryService = new CategoryService();
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const allCategories = await this.categoryService.getAllCategories();
      if (!allCategories)
        throw new CustomError(
          400,
          "Get all categories failed on controller layer.",
        );
      return res.json({
        status: 200,
        message: "Get all categories success.",
        data: allCategories,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { newCategoryInfo } = req.body;
      if (!newCategoryInfo)
        throw new CustomError(
          400,
          "Create category failed on controller layer.",
        );
      const createdCategory =
        await this.categoryService.createCategory(newCategoryInfo);
      if (!createdCategory)
        throw new CustomError(
          400,
          "Create category failed on controller layer.",
        );
      return res.json({
        status: 200,
        message: "Create new category success.",
        data: createdCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedInfo: TUpdateCategory = req.body;
      if (!id || !updatedInfo)
        throw new CustomError(
          400,
          "Update category failed on controller layer. Please check the required fields",
        );
      const updatedInfoWithId: TUpdateCategoryWithId = { id, ...updatedInfo };
      await this.categoryService.updateCategory(updatedInfoWithId);
      return res.json({
        status: 201,
        message: "Update category success.",
      });
    } catch (error) {
      next(error);
    }
  }

  async removeCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id)
        throw new CustomError(
          400,
          "Delete category failed on controller layer.",
        );
      await this.categoryService.removeCategory(id);
      return res.json({
        status: 201,
        massage: "Delete category success.",
      });
    } catch (error) {
      next(error);
    }
  }
}
