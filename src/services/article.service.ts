import { Article } from "../entities/article.entity";
import { CustomError } from "../middlewares/error.middleware";
import { ArticleRepository } from "../repositories/article.repository";
import {
  TCreateArticle,
  TCreateArticleWithTagId,
  TUpdateArticle,
} from "../types/article.type";
import { TagService } from "./tag.service";
import { UserService } from "./user.service";

export class ArticleService {
  private articleRepository: ArticleRepository;
  private tagService: TagService;
  private userService: UserService;

  constructor() {
    this.articleRepository = new ArticleRepository();
    this.tagService = new TagService();
    this.userService = new UserService();
  }

  async createArticle(newArticleInfo: TCreateArticle): Promise<Article> {
    const { thumbnail, title, subtitle, contents, userId, path, tags } =
      newArticleInfo;

    const foundArticle = await this.getArticleFindByPath(path);
    if (foundArticle) throw new CustomError(400, "Article already exists.");

    const tagIds: string[] = [];
    for (const tag of tags) {
      const foundTag = await this.tagService.getOneTagByTitle(tag);
      if (typeof foundTag !== "boolean") tagIds.push(foundTag.id);
    }

    const articleWriter =
      await this.userService.findOneUserByIdWithPassword(userId);

    if (!articleWriter) {
      throw new CustomError(400, "User for article writer does not exist.");
    }

    const newArticleInfoWithTagId: TCreateArticleWithTagId = {
      thumbnail,
      title,
      subtitle,
      contents,
      user: articleWriter,
      path,
      tags: tagIds,
    };

    const createdTag = await this.articleRepository.createArticle(
      newArticleInfoWithTagId,
    );

    // WIP
    const createdTagId = createdTag.id;

    return createdTag;
  }

  getAllArticles() {
    return this.articleRepository.getAllArticles();
  }

  getArticleFindByPath(path: string) {
    return this.articleRepository.getArticleFindByPath(path);
  }

  async updateArticle(
    articleId: string,
    userId: string,
    updatedInfo: TUpdateArticle,
  ) {
    const foundArticle = await this.articleRepository.getArticleById(articleId);
    if (!foundArticle) throw new CustomError(400, "Original aticle not found.");

    const writerId = foundArticle.user.id;
    if (writerId !== userId)
      throw new CustomError(400, "Only the writer can update the article.");

    return this.articleRepository.updateArticle(articleId, updatedInfo);
  }

  async removeArticle(articleId: string, userId: string) {
    const foundArticle = await this.articleRepository.getArticleById(articleId);
    if (!foundArticle) throw new CustomError(400, "Original aticle not found.");

    const writerId = foundArticle.user.id;
    if (writerId !== userId)
      throw new CustomError(400, "Only the writer can remove the article.");

    return this.articleRepository.removeArticle(articleId);
  }

  searchArticle(keyword: string) {
    return this.articleRepository.searchArticle(keyword);
  }

  async getArticlePerPage(strPageNumber: string, strPerPage: string) {
    const pageNumber: number = Number.parseInt(strPageNumber);
    const perPage: number = Number.parseInt(strPerPage);
    const foundArticles = await this.articleRepository.getArticlePerPage(
      pageNumber,
      perPage,
    );
    const totalPageCount =
      await this.articleRepository.getTotalPageCount(perPage);
    return { foundArticles, totalPageCount };
  }
}
