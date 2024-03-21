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
class CategoryController {
    constructor() {
        this.categoryService = new category_service_1.CategoryService();
        this.authHelper = new auth_helper_1.default();
    }
    getAllCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCategories = yield this.categoryService.getAllCategories();
                return res.json({
                    status: 200,
                    message: "Get all categories success.",
                    data: { allCategories },
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
                const newCategoryInfo = req.body;
                if (!newCategoryInfo)
                    throw new error_middleware_1.CustomError(400, "Error: Request body missing. Please provide the necessary data in the request body.");
                const createdCategory = yield this.categoryService.createCategory(newCategoryInfo);
                return res.json({
                    status: 200,
                    message: "Create new category success.",
                    data: { createdCategory, reissuedAccessToken },
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
                const updatedInfo = req.body;
                if (!id || !updatedInfo)
                    throw new error_middleware_1.CustomError(400, "Error: Required request data missing. Please provide either the request body or the necessary parameters in the request.");
                const updatedInfoWithId = Object.assign({ id }, updatedInfo);
                const updatedCategory = yield this.categoryService.updateCategory(updatedInfoWithId);
                return res.json({
                    status: 201,
                    message: "Update category success.",
                    data: { updatedCategory, reissuedAccessToken },
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
                return res.json({
                    status: 201,
                    massage: "Delete category success.",
                    data: { reissuedAccessToken },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
