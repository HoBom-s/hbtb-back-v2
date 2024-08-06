import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { CustomError } from "../middlewares/error.middleware";
import AuthHelper from "../helpers/auth.helper";
import { Auth } from "../types/auth.type";
import CreateCategoryRequestDto from "../dtos/category/createCategoryRequest.dto";
import UpdateCategoryRequestDto from "../dtos/category/updateCategoryRequest.dto";
import validateDto from "../utils/dto.util";
import sendResponse from "../utils/response.util";

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

      return sendResponse(
        res,
        200,
        "Get all categories success.",
        allCategories,
      );
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );

      const createCategoryRequestDto = await validateDto(
        req.body,
        CreateCategoryRequestDto,
      );

      if (!createCategoryRequestDto)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const createdCategory = await this.categoryService.createCategory(
        createCategoryRequestDto,
      );

      return sendResponse(res, 200, "Create new category success.", {
        createdCategory,
        reissuedAccessToken,
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

      const updateCategoryRequestDto = await validateDto(
        req.body,
        UpdateCategoryRequestDto,
      );

      if (!id || !updateCategoryRequestDto)
        throw new CustomError(
          400,
          "Error: Required request data missing. Please provide either the request body or the necessary parameters in the request.",
        );

      const updatedCategory = await this.categoryService.updateCategory(
        id,
        updateCategoryRequestDto,
      );

      return sendResponse(res, 201, "Update category success.", {
        updatedCategory,
        reissuedAccessToken,
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

      return sendResponse(res, 201, "Delete category success.", {
        reissuedAccessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}
