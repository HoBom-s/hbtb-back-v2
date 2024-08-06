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
    createArticle(newArticleInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { thumbnail, title, subtitle, contents, userId, path, tags } = newArticleInfo;
            const foundArticle = yield this.getArticleFindByPath(path);
            if (foundArticle)
                throw new error_middleware_1.CustomError(400, "Article already exists.");
            const tagsStringToArr = tags.replace(/\s/g, "").split(",");
            const tagArr = [];
            for (const tag of tagsStringToArr) {
                const foundTag = yield this.tagService.getOneTagByTitle(tag);
                if (!foundTag)
                    throw new error_middleware_1.CustomError(404, "Tag not found.");
                tagArr.push(foundTag);
            }
            const articleWriter = yield this.userService.findOneUserById(userId);
            if (!articleWriter)
                throw new error_middleware_1.CustomError(404, "User(writer) not found.");
            const thumbnailUrl = yield this.imageService.uploadOneImage({ image: thumbnail, uniqueString: path }, "thumbnail");
            const newArticleInfoWithTagId = {
                thumbnail: thumbnailUrl,
                title,
                subtitle,
                contents,
                user: articleWriter,
                path,
                tags: tagArr,
            };
            const createdArticle = yield this.articleRepository.createArticle(newArticleInfoWithTagId);
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
    updateArticle(articleId, userId, updatedInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundArticle = yield this.articleRepository.getArticleById(articleId);
            const articlePath = foundArticle.path;
            const writerId = foundArticle.user.id;
            this.validateUser(writerId, userId, "update");
            const { thumbnail } = updatedInfo, updatedBodyInfo = __rest(updatedInfo, ["thumbnail"]);
            if (!thumbnail) {
                yield this.articleRepository.updateArticle(articleId, updatedBodyInfo);
            }
            else {
                const thumbnailUrl = yield this.imageService.uploadOneImage({ image: thumbnail, uniqueString: articlePath }, "thumbnail");
                yield this.articleRepository.updateArticle(articleId, Object.assign({ thumbnail: thumbnailUrl }, updatedBodyInfo));
            }
            const updatedArticle = yield this.articleRepository.getArticleById(articleId);
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
            const { pageNumber, perPage, sorting } = perPageInfo;
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
