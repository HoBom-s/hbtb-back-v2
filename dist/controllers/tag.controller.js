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
exports.TagController = void 0;
const tag_service_1 = require("../services/tag.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
const cache_helper_1 = __importDefault(require("../helpers/cache.helper"));
class TagController {
    constructor() {
        this.tagService = new tag_service_1.TagService();
        this.authHelper = new auth_helper_1.default();
        this.cacheHelper = new cache_helper_1.default();
    }
    createTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                const newTagInfo = req.body;
                if (!newTagInfo)
                    throw new error_middleware_1.CustomError(400, "Error: Request body missing. Please provide the necessary data in the request body.");
                const createdTag = yield this.tagService.createTag(newTagInfo);
                yield this.cacheHelper.delCache("tags");
                return res.json({
                    status: 201,
                    message: "Create tag success.",
                    data: { createdTag, reissuedAccessToken },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                const { id } = req.params;
                const updateTagInfo = req.body;
                if (!id || !updateTagInfo)
                    throw new error_middleware_1.CustomError(400, "Error: Required request data missing. Please provide either the request body or the necessary parameters in the request.");
                const updatedTag = yield this.tagService.updateTag(id, updateTagInfo);
                yield this.cacheHelper.delCache("tags");
                return res.json({
                    status: 201,
                    message: "Update tag success.",
                    data: { updatedTag, reissuedAccessToken },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    removeTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                if (!id)
                    throw new error_middleware_1.CustomError(400, "Error: Required parameter missing. Please ensure that all required parameters are provided.");
                yield this.tagService.removeTag(id);
                return res.json({
                    status: 201,
                    message: "Delete tag success.",
                    data: { reissuedAccessToken },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllTags(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundTags = yield this.tagService.getAllTags();
                yield this.cacheHelper.setCache(req, { foundTags });
                return res.json({
                    status: 200,
                    message: "Get all tags success.",
                    data: { foundTags },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TagController = TagController;
