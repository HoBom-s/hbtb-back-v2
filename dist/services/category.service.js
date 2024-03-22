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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const category_repository_1 = require("../repositories/category.repository");
class CategoryService {
    constructor() {
        this.categoryRepository = new category_repository_1.CategoryRepository();
    }
    getAllCategories() {
        return this.categoryRepository.getAllCategories();
    }
    createCategory(newCategoryInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = newCategoryInfo, restInfo = __rest(newCategoryInfo, ["title"]);
            const foundCategory = yield this.categoryRepository.findCategoryByTitle(title);
            if (foundCategory)
                throw new error_middleware_1.CustomError(400, "Category already exists.");
            const existingMaxIndex = yield this.categoryRepository.getMaxIndex();
            const newCategoryInfoWithIndex = Object.assign(Object.assign({}, newCategoryInfo), { sortIndex: existingMaxIndex + 1 });
            return this.categoryRepository.createCategory(newCategoryInfoWithIndex);
        });
    }
    updateCategory(updatedInfoWithId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = updatedInfoWithId, restInfo = __rest(updatedInfoWithId, ["id"]);
            const foundCategory = yield this.categoryRepository.findCategoryById(id);
            if (!foundCategory)
                throw new error_middleware_1.CustomError(404, "Category does not exist.");
            yield this.categoryRepository.updateCategory(updatedInfoWithId);
            const updatedCategory = yield this.categoryRepository.findCategoryById(id);
            if (!updatedCategory)
                throw new error_middleware_1.CustomError(404, "Updated category not found.");
            return updatedCategory;
        });
    }
    removeCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundCategory = yield this.categoryRepository.findCategoryById(categoryId);
            if (!foundCategory)
                throw new error_middleware_1.CustomError(404, "Category does not exist.");
            return this.categoryRepository.removeCategory(categoryId);
        });
    }
}
exports.CategoryService = CategoryService;
