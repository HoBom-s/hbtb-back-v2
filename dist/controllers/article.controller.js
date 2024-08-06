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
exports.ArticleController = void 0;
const article_service_1 = require("../services/article.service");
const createArticleRequest_dto_1 = __importDefault(require("../dtos/article/createArticleRequest.dto"));
const dto_util_1 = __importDefault(require("../utils/dto.util"));
const updateArticleRequest_dto_1 = __importDefault(require("../dtos/article/updateArticleRequest.dto"));
const response_util_1 = __importDefault(require("../utils/response.util"));
const article_type_1 = require("../types/article.type");
const error_middleware_1 = require("../middlewares/error.middleware");
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
const cache_helper_1 = __importDefault(require("../helpers/cache.helper"));
class ArticleController {
    constructor() {
        this.articleService = new article_service_1.ArticleService();
        this.authHelper = new auth_helper_1.default();
        this.cacheHelper = new cache_helper_1.default();
    }
    createArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                const thumbnail = req.file;
                const createArticleRequestDto = yield (0, dto_util_1.default)(req.body, createArticleRequest_dto_1.default);
                if (!createArticleRequestDto)
                    throw new error_middleware_1.CustomError(400, "Error: Request body missing. Please provide the necessary data in the request body.");
                const createdArticle = yield this.articleService.createArticle(userId, createArticleRequestDto, thumbnail);
                yield this.cacheHelper.delCache("articles");
                return (0, response_util_1.default)(res, 201, "Create article success.", {
                    createdArticle,
                    reissuedAccessToken,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getArticleFindByPath(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { path } = req.params;
                if (!path)
                    throw new error_middleware_1.CustomError(400, "Error: Required parameter missing. Please ensure that all required parameters are provided.");
                const foundArticle = yield this.articleService.getArticleFindByPath(path);
                return (0, response_util_1.default)(res, 200, "Get article by path success.", {
                    foundArticle,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllArticles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allArticles = yield this.articleService.getAllArticles();
                yield this.cacheHelper.setCache(req, { allArticles });
                return (0, response_util_1.default)(res, 200, "Get article success.", { allArticles });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                const { id } = req.params;
                const thumbnail = req.file;
                const updateArticleRequestDto = yield (0, dto_util_1.default)(req.body, updateArticleRequest_dto_1.default);
                if (!id || !updateArticleRequestDto)
                    throw new error_middleware_1.CustomError(400, "Error: Required request data missing. Please provide either the request body or the necessary parameters in the request.");
                const updatedArticle = yield this.articleService.updateArticle(id, userId, updateArticleRequestDto, thumbnail);
                yield this.cacheHelper.delCache("articles");
                return (0, response_util_1.default)(res, 201, "Update article success.", {
                    updatedArticle,
                    reissuedAccessToken,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    removeArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                const { id } = req.params;
                if (!id)
                    throw new error_middleware_1.CustomError(400, "Error: Required parameter missing. Please ensure that all required parameters are provided.");
                yield this.articleService.removeArticle(id, userId);
                yield this.cacheHelper.delCache("articles");
                return (0, response_util_1.default)(res, 201, "Delete article success.", {
                    reissuedAccessToken,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    searchArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { keyword } = req.query;
                if (!keyword)
                    throw new error_middleware_1.CustomError(400, "Error: Required query parameter 'keyword' missing. Please include the 'keyword' parameter in your request query.");
                const foundArticles = yield this.articleService.searchArticle(keyword);
                return (0, response_util_1.default)(res, 200, "Get searched articles success.", {
                    foundArticles,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getArticlePerPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pageNumber, perPage, sorting } = req.query;
                if (!pageNumber || !perPage)
                    throw new error_middleware_1.CustomError(400, "Error: Required query parameter 'pageNumber' or 'perPage' missing. Please include the 'pageNumber' or 'perPage' parameter in your request query.");
                const isSortingValid = (0, article_type_1.isSORTING)(sorting);
                if (!isSortingValid) {
                    throw new error_middleware_1.CustomError(400, "Error: Required query parameter 'sorting' should be one of '`asc` | `desc` | undefined'(case-insensitive).");
                }
                const perPageInfo = {
                    pageNumber: parseInt(pageNumber, 10),
                    perPage: parseInt(perPage, 10),
                    sorting,
                };
                const articlesAndPageCount = yield this.articleService.getArticlePerPage(perPageInfo);
                yield this.cacheHelper.setCache(req, { articlesAndPageCount });
                return (0, response_util_1.default)(res, 200, "Get articles per page success.", {
                    articlesAndPageCount,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ArticleController = ArticleController;
