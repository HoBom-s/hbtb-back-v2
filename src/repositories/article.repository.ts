import { Repository, Like } from "typeorm";
import Article from "../entities/article.entity";
import {
  ArticlePerPageInfo,
  CreateArticleWithUserAndTag,
} from "../types/article.type";
import { myDataSource } from "../data-source";
import { CustomError } from "../middlewares/error.middleware";
import { PossibleNull } from "../types/common.type";
import UpdateArticleRequestDto from "../dtos/article/updateArticleRequest.dto";

export class ArticleRepository {
  private article: Repository<Article>;

  constructor() {
    this.article = myDataSource.getRepository(Article);
  }

  async createArticle(
    newArticleInfo: CreateArticleWithUserAndTag,
  ): Promise<Article> {
    const createdArticle = this.article.create(newArticleInfo);

    if (!createdArticle) throw new CustomError(404, "Create article failed.");

    await this.article.save(createdArticle);

    return createdArticle;
  }

  async getAllArticles(): Promise<Article[]> {
    const allArticles = await this.article.find({
      order: { createdAt: "DESC" },
      relations: {
        user: true,
      },
    });

    if (allArticles === undefined)
      throw new CustomError(404, "Get all articles failed.");

    return allArticles;
  }

  async getArticleFindByPath(path: string): Promise<PossibleNull<Article>> {
    const foundArticle = await this.article.findOne({
      where: { path },
      relations: { user: true },
    });

    if (!foundArticle) return null;

    return foundArticle;
  }

  async getArticleById(id: string): Promise<Article> {
    const foundArticle = await this.article.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!foundArticle)
      throw new CustomError(404, "Original article not found.");

    return foundArticle;
  }

  async updateArticle(
    id: string,
    updateArticleRequestDto: UpdateArticleRequestDto,
    thumbnailUrl?: string,
  ) {
    updateArticleRequestDto = thumbnailUrl
      ? { thumbnail: thumbnailUrl, ...updateArticleRequestDto }
      : updateArticleRequestDto;

    const updateResult = await this.article.update(id, updateArticleRequestDto);

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

  async getArticlePerPage(perPageInfo: ArticlePerPageInfo): Promise<Article[]> {
    let { pageNumber, perPage, sorting } = perPageInfo;

    if (!sorting) sorting = "DESC";

    const foundArticles = await this.article.find({
      order: { createdAt: sorting },
      skip: (pageNumber - 1) * perPage,
      take: perPage,
      relations: { user: true },
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
