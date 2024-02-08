import { Article } from "../entities/article.entity";
import { CustomError } from "../middlewares/error.middleware";
import { ArticleRepository } from "../repositories/article.repository";
import {
  TCreateArticle,
  TCreateArticleWithTagId,
  TUpdateArticle,
} from "../types/article.type";
import { TagService } from "./tag.service";

export class ArticleService {
  private articleRepository: ArticleRepository;
  private tagService: TagService;

  constructor() {
    this.articleRepository = new ArticleRepository();
    this.tagService = new TagService();
  }

  async createArticle(newArticleInfo: TCreateArticle): Promise<Article> {
    const { thumbnail, title, subtitle, contents, userId, path, tags } =
      newArticleInfo;

    const foundArticle = await this.getArticleFindByPath(path);
    if (foundArticle) throw new CustomError(400, "Article already exists.");

    const tagIds: string[] = [];
    for (const tag of tags) {
      const tagId = await this.tagService.getOneTagIdByTitle(tag);
      if (typeof tagId === "string") tagIds.push(tagId);
    }

    console.log("::: tagIds :::", tagIds);

    const newArticleInfoWithTagId: TCreateArticleWithTagId = {
      thumbnail,
      title,
      subtitle,
      contents,
      userId,
      path,
      tags: tagIds,
    };
    return this.articleRepository.createArticle(newArticleInfoWithTagId);
  }

  getAllArticles() {
    return this.articleRepository.getAllArticles();
  }

  getArticleFindByPath(path: string) {
    return this.articleRepository.getArticleFindByPath(path);
  }

  async updateArticle(articleId: string, updatedInfo: TUpdateArticle) {
    const foundArticle = await this.articleRepository.getArticleById(articleId);
    if (!foundArticle) throw new CustomError(400, "Original aticle not found.");
    return this.articleRepository.updateArticle(articleId, updatedInfo);
  }

  async removeArticle(articleId: string) {
    const foundArticle = this.articleRepository.getArticleById(articleId);
    if (!foundArticle) throw new CustomError(400, "Original aticle not found.");
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
