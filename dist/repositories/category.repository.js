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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const category_entity_1 = __importDefault(require("../entities/category.entity"));
const data_source_1 = require("../data-source");
const error_middleware_1 = require("../middlewares/error.middleware");
class CategoryRepository {
    constructor() {
        this.category = data_source_1.myDataSource.getRepository(category_entity_1.default);
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const allCategories = yield this.category.find();
            if (allCategories === undefined)
                throw new error_middleware_1.CustomError(404, "Get all categories failed.");
            return allCategories;
        });
    }
    findCategoryByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundCategory = yield this.category.findOneBy({ title });
            if (!foundCategory)
                return null;
            return foundCategory;
        });
    }
    findCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundCategory = yield this.category.findOneBy({ id });
            if (!foundCategory)
                return null;
            return foundCategory;
        });
    }
    createCategory(newCategoryInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCategory = this.category.create(newCategoryInfo);
            if (!createdCategory)
                throw new error_middleware_1.CustomError(404, "Create category failed.");
            yield this.category.save(createdCategory);
            return createdCategory;
        });
    }
    updateCategory(updatedInfoWithId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = updatedInfoWithId, updatedInfo = __rest(updatedInfoWithId, ["id"]);
            const updateResult = yield this.category.update(id, updatedInfo);
            if (!updateResult.affected)
                throw new error_middleware_1.CustomError(404, "Update category failed: 0 affected.");
            return;
        });
    }
    removeCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.category.delete(id);
            if (!deleteResult.affected)
                throw new error_middleware_1.CustomError(404, "Category delete failed: 0 affected.");
            return;
        });
    }
    getMaxIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            const maxIndex = yield this.category.maximum("sortIndex", {});
            if (!maxIndex)
                return 0;
            return maxIndex;
        });
    }
}
exports.CategoryRepository = CategoryRepository;
