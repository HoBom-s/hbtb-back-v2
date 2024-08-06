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
exports.ArticleService = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const article_repository_1 = require("../repositories/article.repository");
const image_service_1 = require("./image.service");
const tag_service_1 = require("./tag.service");
const user_service_1 = require("./user.service");
class ArticleService {
    constructor() {
        this.articleRepository = new article_repository_1.ArticleRepository();
        this.tagService = new tag_service_1.TagService();
        this.userService = new user_service_1.UserService();
        this.imageService = new image_service_1.ImageService();
    }
    createArticle(userId, createArticleRequestDto, thumbnail) {
        return __awaiter(this, void 0, void 0, function* () {
            const { path, tags } = createArticleRequestDto;
            const foundArticle = yield this.getArticleFindByPath(path);
            if (foundArticle)
                throw new error_middleware_1.CustomError(400, "Article already exists.");
            const tagsStringToArr = tags.replace(/\s/g, "").split(",");
            const tagArr = [];
            for (const tagTitle of tagsStringToArr) {
                const foundTag = yield this.tagService.getOneTagByTitle(tagTitle);
                if (!foundTag)
                    throw new error_middleware_1.CustomError(404, "Tag not found.");
                tagArr.push(foundTag);
            }
            const writer = yield this.userService.findOneUserById(userId);
            if (!writer)
                throw new error_middleware_1.CustomError(404, "User(writer) not found.");
            const thumbnailUrl = yield this.imageService.uploadOneImage({ image: thumbnail, uniqueString: path }, "thumbnail");
            const newArticleInfo = Object.assign(Object.assign({}, createArticleRequestDto), { thumbnail: thumbnailUrl, tags: tagArr, user: writer });
            const createdArticle = yield this.articleRepository.createArticle(newArticleInfo);
            return createdArticle;
        });
    }
    getAllArticles() {
        return this.articleRepository.getAllArticles();
    }
    getArticleFindByPath(path) {
        path = "/" + path;
        return this.articleRepository.getArticleFindByPath(path);
    }
    updateArticle(id, userId, updateArticleRequestDto, thumbnail) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundArticle = yield this.articleRepository.getArticleById(id);
            const articlePath = foundArticle.path;
            const writerId = foundArticle.user.id;
            this.validateUser(writerId, userId, "update");
            if (thumbnail) {
                const thumbnailUrl = yield this.imageService.uploadOneImage({ image: thumbnail, uniqueString: articlePath }, "thumbnail");
                yield this.articleRepository.updateArticle(id, updateArticleRequestDto, thumbnailUrl);
            }
            else {
                yield this.articleRepository.updateArticle(id, updateArticleRequestDto);
            }
            const updatedArticle = yield this.articleRepository.getArticleById(id);
            return updatedArticle;
        });
    }
    removeArticle(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundArticle = yield this.articleRepository.getArticleById(articleId);
            const writerId = foundArticle.user.id;
            const thumbnailUrl = foundArticle.thumbnail;
            this.validateUser(writerId, userId, "remove");
            yield this.imageService.removeOneImage(thumbnailUrl);
            return this.articleRepository.removeArticle(articleId);
        });
    }
    searchArticle(keyword) {
        return this.articleRepository.searchArticle(keyword);
    }
    getArticlePerPage(perPageInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { perPage } = perPageInfo;
            const foundArticles = yield this.articleRepository.getArticlePerPage(perPageInfo);
            const totalPageCount = yield this.articleRepository.getTotalPageCount(perPage);
            return { foundArticles, totalPageCount };
        });
    }
    validateUser(writerId, userId, type) {
        if (writerId !== userId)
            throw new error_middleware_1.CustomError(401, `Only the writer can ${type} the article.`);
        return;
    }
}
exports.ArticleService = ArticleService;
