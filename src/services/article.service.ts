import Article from "../entities/article.entity";
import Tag from "../entities/tag.entity";
import { ErrorMessage, ErrorStatus } from "../middlewares/error/error.enum";
import { CustomError } from "../middlewares/error/error.middleware";
import { ArticleRepository } from "../repositories/article.repository";
import {
  ArticlePagination,
  ArticlePerPageInfo,
  CreateArticle,
  CreateArticleWithTagId,
  UpdateArticleInfo,
} from "../types/article.type";
import { PossibleNull } from "../types/common.type";

import { ImageService } from "./image.service";
import { TagService } from "./tag.service";
import { UserService } from "./user.service";

export class ArticleService {
  private articleRepository: ArticleRepository;
  private tagService: TagService;
  private userService: UserService;
  private imageService: ImageService;

  constructor() {
    this.articleRepository = new ArticleRepository();
    this.tagService = new TagService();
    this.userService = new UserService();
    this.imageService = new ImageService();
  }

  async createArticle(newArticleInfo: CreateArticle): Promise<Article> {
    const { thumbnail, title, subtitle, contents, userId, path, tags } =
      newArticleInfo;

    const foundArticle = await this.getArticleFindByPath(path);
    if (foundArticle)
      throw new CustomError(
        ErrorStatus.BAD_REQUEST,
        ErrorMessage.ALREADY_EXISTS,
      );

    const tagsStringToArr: string[] = tags.replace(/\s/g, "").split(",");

    const tagArr: Tag[] = [];
    for (const tag of tagsStringToArr) {
      const foundTag = await this.tagService.getOneTagByTitle(tag);
      if (!foundTag)
        throw new CustomError(ErrorStatus.NOT_FOUND, ErrorMessage.NOT_FOUND);
      tagArr.push(foundTag);
    }

    const articleWriter = await this.userService.findOneUserById(userId);
    if (!articleWriter)
      throw new CustomError(ErrorStatus.NOT_FOUND, ErrorMessage.NOT_FOUND);

    const thumbnailUrl = await this.imageService.uploadOneImage(
      { image: thumbnail, uniqueString: path },
      "thumbnail",
    );

    const newArticleInfoWithTagId: CreateArticleWithTagId = {
      thumbnail: thumbnailUrl,
      title,
      subtitle,
      contents,
      user: articleWriter,
      path,
      tags: tagArr,
    };

    const createdArticle = await this.articleRepository.createArticle(
      newArticleInfoWithTagId,
    );

    return createdArticle;
  }

  getAllArticles(): Promise<Article[]> {
    return this.articleRepository.getAllArticles();
  }

  getArticleFindByPath(path: string): Promise<PossibleNull<Article>> {
    path = "/" + path;
    return this.articleRepository.getArticleFindByPath(path);
  }

  async updateArticle(
    articleId: string,
    userId: string,
    updatedInfo: UpdateArticleInfo,
  ): Promise<Article> {
    const foundArticle = await this.articleRepository.getArticleById(articleId);
    const articlePath = foundArticle.path;

    const writerId = foundArticle.user.id;
    this.validateUser(writerId, userId, "update");

    const { thumbnail, ...updatedBodyInfo } = updatedInfo;

    if (!thumbnail) {
      await this.articleRepository.updateArticle(articleId, updatedBodyInfo);
    } else {
      const thumbnailUrl = await this.imageService.uploadOneImage(
        { image: thumbnail, uniqueString: articlePath },
        "thumbnail",
      );

      await this.articleRepository.updateArticle(articleId, {
        thumbnail: thumbnailUrl,
        ...updatedBodyInfo,
      });
    }

    const updatedArticle =
      await this.articleRepository.getArticleById(articleId);

    return updatedArticle;
  }

  async removeArticle(articleId: string, userId: string) {
    const foundArticle = await this.articleRepository.getArticleById(articleId);

    const writerId = foundArticle.user.id;
    const thumbnailUrl = foundArticle.thumbnail;

    this.validateUser(writerId, userId, "remove");

    await this.imageService.removeOneImage(thumbnailUrl);

    return this.articleRepository.removeArticle(articleId);
  }

  searchArticle(keyword: string): Promise<Article[]> {
    return this.articleRepository.searchArticle(keyword);
  }

  async getArticlePerPage(
    perPageInfo: ArticlePerPageInfo,
  ): Promise<ArticlePagination> {
    const { pageNumber, perPage, sorting } = perPageInfo;

    const foundArticles =
      await this.articleRepository.getArticlePerPage(perPageInfo);

    const totalPageCount =
      await this.articleRepository.getTotalPageCount(perPage);

    return { foundArticles, totalPageCount };
  }

  validateUser(writerId: string, userId: string, type: string) {
    if (writerId !== userId)
      throw new CustomError(401, `Only the writer can ${type} the article.`);

    return;
  }
}
