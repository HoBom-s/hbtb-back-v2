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
exports.TagRepository = void 0;
const tag_entity_1 = __importDefault(require("../entities/tag.entity"));
const data_source_1 = require("../data-source");
const error_middleware_1 = require("../middlewares/error.middleware");
class TagRepository {
    constructor() {
        this.tag = data_source_1.myDataSource.getRepository(tag_entity_1.default);
    }
    getOneTagById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundTag = yield this.tag.findOneBy({ id });
            if (!foundTag)
                throw new error_middleware_1.CustomError(404, "Original tag not found.");
            return foundTag;
        });
    }
    getOneTagByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundTag = yield this.tag.findOneBy({ title });
            if (!foundTag)
                return null;
            return foundTag;
        });
    }
    createTag(createTagRequestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdTag = this.tag.create(createTagRequestDto);
            if (!createdTag)
                throw new error_middleware_1.CustomError(404, "Create tag failed.");
            yield this.tag.save(createdTag);
            return createdTag;
        });
    }
    updateTag(id, updateTagRequestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield this.tag.update(id, updateTagRequestDto);
            if (!updateResult.affected)
                throw new error_middleware_1.CustomError(404, "Update tag failed: 0 affected.");
            return;
        });
    }
    removeTag(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.tag.delete(id);
            if (!deleteResult)
                throw new error_middleware_1.CustomError(404, "Delete tag failed: 0 affected.");
            return;
        });
    }
    getAllTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundTags = yield this.tag.find();
            if (foundTags === undefined)
                throw new error_middleware_1.CustomError(404, "Get all tags failed");
            return foundTags;
        });
    }
}
exports.TagRepository = TagRepository;
