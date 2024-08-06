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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const tag_repository_1 = require("../repositories/tag.repository");
class TagService {
    constructor() {
        this.tagRepository = new tag_repository_1.TagRepository();
    }
    getOneTagByTitle(title) {
        return this.tagRepository.getOneTagByTitle(title);
    }
    createTag(createTagRequestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = createTagRequestDto;
            const foundTag = yield this.tagRepository.getOneTagByTitle(title);
            if (foundTag)
                throw new error_middleware_1.CustomError(400, "Tag already exists.");
            return this.tagRepository.createTag(createTagRequestDto);
        });
    }
    updateTag(tagId, updateTagRequestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tagRepository.getOneTagById(tagId);
            yield this.tagRepository.updateTag(tagId, updateTagRequestDto);
            const updatedTag = yield this.tagRepository.getOneTagById(tagId);
            return updatedTag;
        });
    }
    removeTag(tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tagRepository.getOneTagById(tagId);
            return this.tagRepository.removeTag(tagId);
        });
    }
    getAllTags() {
        return this.tagRepository.getAllTags();
    }
}
exports.TagService = TagService;
