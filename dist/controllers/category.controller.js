"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
const createCategoryRequest_dto_1 = __importDefault(require("../dtos/category/createCategoryRequest.dto"));
const updateCategoryRequest_dto_1 = __importDefault(require("../dtos/category/updateCategoryRequest.dto"));
const dto_util_1 = __importDefault(require("../utils/dto.util"));
const response_util_1 = __importDefault(require("../utils/response.util"));
class CategoryController {
    constructor() {
        this.categoryService = new category_service_1.CategoryService();
        this.authHelper = new auth_helper_1.default();
    }
    getAllCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCategories = yield this.categoryService.getAllCategories();
                return (0, response_util_1.default)(res, 200, "Get all categories success.", {
                    allCategories,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                const createCategoryRequestDto = yield (0, dto_util_1.default)(req.body, createCategoryRequest_dto_1.default);
                if (!createCategoryRequestDto)
                    throw new error_middleware_1.CustomError(400, "Error: Request body missing. Please provide the necessary data in the request body.");
                const createdCategory = yield this.categoryService.createCategory(createCategoryRequestDto);
                return (0, response_util_1.default)(res, 200, "Create new category success.", {
                    createdCategory,
                    reissuedAccessToken,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                const { id } = req.params;
                const updateCategoryRequestDto = yield (0, dto_util_1.default)(req.body, updateCategoryRequest_dto_1.default);
                if (!id || !updateCategoryRequestDto)
                    throw new error_middleware_1.CustomError(400, "Error: Required request data missing. Please provide either the request body or the necessary parameters in the request.");
                const updatedCategory = yield this.categoryService.updateCategory(id, updateCategoryRequestDto);
                return (0, response_util_1.default)(res, 201, "Update category success.", {
                    updatedCategory,
                    reissuedAccessToken,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    removeCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                const { id } = req.params;
                if (!id)
                    throw new error_middleware_1.CustomError(400, "Error: Required parameter missing. Please ensure that all required parameters are provided.");
                yield this.categoryService.removeCategory(id);
                return (0, response_util_1.default)(res, 201, "Delete category success.", {
                    reissuedAccessToken,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
