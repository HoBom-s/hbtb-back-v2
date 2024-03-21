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
exports.ArticleRepository = void 0;
const typeorm_1 = require("typeorm");
const article_entity_1 = __importDefault(require("../entities/article.entity"));
const data_source_1 = require("../data-source");
const error_middleware_1 = require("../middlewares/error.middleware");
class ArticleRepository {
    constructor() {
        this.article = data_source_1.myDataSource.getRepository(article_entity_1.default);
    }
    createArticle(newArticleInfoWithTagId) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdArticle = this.article.create(newArticleInfoWithTagId);
            if (!createdArticle)
                throw new error_middleware_1.CustomError(404, "Create article failed.");
            yield this.article.save(createdArticle);
            return createdArticle;
        });
    }
    getAllArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            const allArticles = yield this.article.find({
                order: { createdAt: "DESC" },
                relations: {
                    user: true,
                },
            });
            if (allArticles === undefined)
                throw new error_middleware_1.CustomError(404, "Get all articles failed.");
            return allArticles;
        });
    }
    getArticleFindByPath(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundArticle = yield this.article.findOne({
                where: { path },
                relations: { user: true },
            });
            if (!foundArticle)
                return null;
            return foundArticle;
        });
    }
    getArticleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundArticle = yield this.article.findOne({
                where: { id },
                relations: { user: true },
            });
            if (!foundArticle)
                throw new error_middleware_1.CustomError(404, "Original article not found.");
            return foundArticle;
        });
    }
    updateArticle(id, updatedInfoWithUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield this.article.update(id, updatedInfoWithUrl);
            if (!updateResult.affected)
                throw new error_middleware_1.CustomError(404, "Update article failed: 0 affected.");
            return;
        });
    }
    removeArticle(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.article.delete(articleId);
            if (!deleteResult.affected)
                throw new error_middleware_1.CustomError(404, "Delete article failed: 0 affected.");
            return;
        });
    }
    searchArticle(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundArticles = yield this.article.find({
                where: [
                    { title: (0, typeorm_1.Like)(`%${keyword}%`) },
                    { subtitle: (0, typeorm_1.Like)(`%${keyword}%`) },
                ],
                relations: { user: true },
            });
            if (foundArticles === undefined)
                throw new error_middleware_1.CustomError(404, "Search article failed.");
            return foundArticles;
        });
    }
    getArticlePerPage(perPageInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let { pageNumber, perPage, sorting } = perPageInfo;
            if (!sorting)
                sorting = "DESC";
            const foundArticles = yield this.article.find({
                order: { createdAt: sorting },
                skip: (pageNumber - 1) * perPage,
                take: perPage,
                relations: { user: true },
            });
            if (foundArticles === undefined)
                throw new error_middleware_1.CustomError(404, "Get Article per page failed.");
            return foundArticles;
        });
    }
    getArticleCount() {
        return this.article.count({});
    }
    getTotalPageCount(perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalArticleCount = yield this.getArticleCount();
            let totalPageCount;
            if (totalArticleCount % perPage === 0) {
                totalPageCount = totalArticleCount / perPage;
            }
            else {
                totalPageCount = Math.floor(totalArticleCount / perPage) + 1;
            }
            return totalPageCount;
        });
    }
}
exports.ArticleRepository = ArticleRepository;
