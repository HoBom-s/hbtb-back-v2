import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { CustomError } from "../middlewares/error.middleware";
import { TUpdateCategoryWithId } from "../types/category.type";
import AuthHelper from "../helpers/auth.helper";
import { Auth } from "../types/auth.type";
import CreateCategoryRequestDto from "../dtos/category/createCategoryRequest.dto";
import UpdateCategoryRequestDto from "../dtos/category/updateCategoryRequest.dto";
import validateDto from "../utils/dto.util";

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

      const createCategoryRequest = await validateDto(
        req.body,
        CreateCategoryRequestDto,
      );

      if (!createCategoryRequest)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const createdCategory = await this.categoryService.createCategory(
        createCategoryRequest,
      );

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

      const updateCategoryRequest = await validateDto(
        req.body,
        UpdateCategoryRequestDto,
      );

      if (!id || !updateCategoryRequest)
        throw new CustomError(
          400,
          "Error: Required request data missing. Please provide either the request body or the necessary parameters in the request.",
        );

      const updatedInfoWithId: TUpdateCategoryWithId = {
        id,
        ...updateCategoryRequest,
      };

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
      if (!id)
        throw new CustomError(
          400,
          "Error: Required parameter missing. Please ensure that all required parameters are provided.",
        );

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
