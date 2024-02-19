import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { CustomError } from "../middlewares/error.middleware";
import {
  TCreateCategory,
  TUpdateCategory,
  TUpdateCategoryWithId,
} from "../types/category.type";
import AuthHelper from "../helpers/auth.helper";
import { Auth } from "../types/auth.type";

export class CategoryController {
  private categoryService: CategoryService;
  private authHelper: AuthHelper;

  constructor() {
    this.categoryService = new CategoryService();
    this.authHelper = new AuthHelper();
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const allCategories = await this.categoryService.getAllCategories();

      return res.json({
        status: 200,
        message: "Get all categories success.",
        data: allCategories,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );

      const newCategoryInfo: TCreateCategory = req.body;
      if (!newCategoryInfo)
        throw new CustomError(400, "Missing required fields.");

      const createdCategory =
        await this.categoryService.createCategory(newCategoryInfo);

      return res.json({
        status: 200,
        message: "Create new category success.",
        data: { createdCategory, reissuedAccessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );
      const { id } = req.params;
      const updatedInfo: TUpdateCategory = req.body;

      if (!id || !updatedInfo)
        throw new CustomError(400, "Missing required fields");

      const updatedInfoWithId: TUpdateCategoryWithId = { id, ...updatedInfo };

      const updatedCategory =
        await this.categoryService.updateCategory(updatedInfoWithId);

      return res.json({
        status: 201,
        message: "Update category success.",
        data: { updatedCategory, reissuedAccessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeCategory(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );
      const { id } = req.params;
      if (!id) throw new CustomError(400, "Missing req.params.");

      await this.categoryService.removeCategory(id);

      return res.json({
        status: 201,
        massage: "Delete category success.",
        data: { reissuedAccessToken },
      });
    } catch (error) {
      next(error);
    }
  }
}
