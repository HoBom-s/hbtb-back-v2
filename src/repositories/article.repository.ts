import { Repository } from "typeorm";
import { Article } from "../entities/article.entity";
import { TCreateArticle } from "../types/article.type";
import { myDataSource } from "../data-source";
import { CustomError } from "../middleware/error.middleware";

export class ArticleRepository {
  private article: Repository<Article>;

  constructor() {
    this.article = myDataSource.getRepository(Article);
  }

  // WIP: tag creation
  async createArticle(newArticleInfo: TCreateArticle): Promise<Article> {
    const createdArticle = this.article.create(newArticleInfo);
    if (!createdArticle) throw new CustomError(400, "Create article failed.");
    await this.article.save(createdArticle);
    return createdArticle;
  }

  // WIP: getting tag info
  async getAllArticles(): Promise<Article[]> {
    const allArticles = await this.article.find({
      relations: {
        user: true,
      },
    });
    if (!allArticles) throw new CustomError(400, "Get all articles failed.");
    return allArticles;
  }

  async getArticleFindByPath(path: string) {
    const foundArticle = await this.article.find({
      where: { path },
      relations: { user: true },
    });
    if (!foundArticle)
      throw new CustomError(400, "Article with the path NOT FOUND.");
    return foundArticle;
  }
}

/*
() tagControl
() writerControl
(v) getAllArticleRequest
() getArticlePerPageRequest
() getArticleFindByPathRequest
() getArticleSearchRequest
(v) createArticleRequest
() updateArticleRequest
() deleteArticleRequest
 */

/*
id
thumbnail
title
subtitle
contents
path
userId
tags
*/
