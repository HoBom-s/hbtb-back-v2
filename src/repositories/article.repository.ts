import { Repository, Like } from "typeorm";
import Article from "../entities/article.entity";
import {
  CreateArticleWithTagId,
  UpdateArticleInfoWithThumbnailUrl,
} from "../types/article.type";
import { myDataSource } from "../data-source";
import { CustomError } from "../middlewares/error.middleware";
import { PossibleNull } from "../types/common.type";

export class ArticleRepository {
  private article: Repository<Article>;

  constructor() {
    this.article = myDataSource.getRepository(Article);
  }

  async createArticle(
    newArticleInfoWithTagId: CreateArticleWithTagId,
  ): Promise<Article> {
    const createdArticle = this.article.create(newArticleInfoWithTagId);
    if (!createdArticle) throw new CustomError(404, "Create article failed.");

    await this.article.save(createdArticle);

    return createdArticle;
  }

  async getAllArticles(): Promise<Article[]> {
    const allArticles = await this.article.find({
      relations: {
        user: true,
        tags: true,
      },
    });
    if (allArticles === undefined)
      throw new CustomError(404, "Get all articles failed.");

    return allArticles;
  }

  async getArticleFindByPath(path: string): Promise<PossibleNull<Article>> {
    const foundArticle = await this.article.findOne({
      where: { path },
      relations: { user: true, tags: true },
    });
    if (!foundArticle) return null;

    return foundArticle;
  }

  async getArticleById(id: string): Promise<Article> {
    const foundArticle = await this.article.findOne({
      where: { id },
      relations: { user: true, tags: true },
    });
    if (!foundArticle) throw new CustomError(404, "Original aticle not found.");

    return foundArticle;
  }

  async updateArticle(
    id: string,
    updatedInfoWithUrl: UpdateArticleInfoWithThumbnailUrl,
  ) {
    const updateResult = await this.article.update(id, updatedInfoWithUrl);
    if (!updateResult.affected)
      throw new CustomError(404, "Update article failed: 0 affected.");

    return;
  }

  async removeArticle(articleId: string) {
    const deleteResult = await this.article.delete(articleId);
    if (!deleteResult.affected)
      throw new CustomError(404, "Delete article failed: 0 affected.");

    return;
  }

  async searchArticle(keyword: string): Promise<Article[]> {
    const foundArticles = await this.article.find({
      where: [
        { title: Like(`%${keyword}%`) },
        { subtitle: Like(`%${keyword}%`) },
      ],
      relations: { user: true },
    });

    if (foundArticles === undefined)
      throw new CustomError(404, "Search article failed.");

    return foundArticles;
  }

  async getArticlePerPage(
    pageNumber: number,
    perPage: number,
  ): Promise<Article[]> {
    const foundArticles = await this.article.find({
      order: { createdAt: "DESC" },
      skip: (pageNumber - 1) * perPage,
      take: perPage,
    });

    if (foundArticles === undefined)
      throw new CustomError(404, "Get Article per page failed.");

    return foundArticles;
  }

  getArticleCount(): Promise<number> {
    return this.article.count({});
  }

  async getTotalPageCount(perPage: number): Promise<number> {
    const totalArticleCount = await this.getArticleCount();

    let totalPageCount: number;
    if (totalArticleCount % perPage === 0) {
      totalPageCount = totalArticleCount / perPage;
    } else {
      totalPageCount = Math.floor(totalArticleCount / perPage) + 1;
    }

    return totalPageCount;
  }
}
