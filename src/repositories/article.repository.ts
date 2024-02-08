import { Repository, Like } from "typeorm";
import { Article } from "../entities/article.entity";
import { TCreateArticleWithTagId, TUpdateArticle } from "../types/article.type";
import { myDataSource } from "../data-source";
import { CustomError } from "../middlewares/error.middleware";

export class ArticleRepository {
  private article: Repository<Article>;

  constructor() {
    this.article = myDataSource.getRepository(Article);
  }

  async createArticle(
    newArticleInfoWithTagId: TCreateArticleWithTagId,
  ): Promise<Article> {
    const createdArticle = this.article.create(newArticleInfoWithTagId);
    if (!createdArticle) throw new CustomError(400, "Create article failed.");
    await this.article.save(createdArticle);
    return createdArticle;
  }

  async getAllArticles(): Promise<Article[]> {
    const allArticles = await this.article.find({
      relations: {
        user: true,
      },
    });
    if (!allArticles) throw new CustomError(400, "Get all articles failed.");
    return allArticles;
  }

  async getArticleFindByPath(path: string): Promise<Article | boolean> {
    const foundArticle = await this.article.findOne({
      where: { path },
      relations: { user: true },
    });
    if (!foundArticle) return false;
    return foundArticle;
  }

  async getArticleById(id: string) {
    const foundArticle = await this.article.findOneBy({ id });
    if (!foundArticle) return false;
    return foundArticle;
  }

  async updateArticle(id: string, updatedInfo: TUpdateArticle) {
    const updatedResult = await this.article.update({ id }, updatedInfo);
    if (!updatedResult) throw new CustomError(400, "Update article failed.");
    return true;
  }

  async removeArticle(articleId: string) {
    const deletedResult = await this.article.delete(articleId);
    if (!deletedResult) throw new CustomError(400, "Delete article failed.");
    return true;
  }

  async searchArticle(keyword: string) {
    const foundArticles = await this.article.find({
      where: [
        { title: Like(`%${keyword}%`) },
        { subtitle: Like(`%${keyword}%`) },
      ],
      relations: { user: true },
    });
    if (!foundArticles) return "No article with the keyword.";
    return foundArticles;
  }

  async getArticlePerPage(pageNumber: number, perPage: number) {
    const foundArticles = await this.article.find({
      order: { createdAt: "DESC" },
      skip: (pageNumber - 1) * perPage,
      take: perPage,
    });
    return foundArticles;
  }

  async getArticleCount() {
    return await this.article.count({});
  }

  async getTotalPageCount(perPage: number) {
    const totalArticleCount = await this.getArticleCount();
    let totalPageCount: number;
    if (totalArticleCount % perPage === 0)
      totalPageCount = totalArticleCount / perPage;
    else totalPageCount = totalArticleCount / perPage + 1;
    return totalPageCount;
  }
}
