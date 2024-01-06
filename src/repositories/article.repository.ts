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

  createArticle(newArticleInfo: TCreateArticle): Article {
    const createdArticle = this.article.create(newArticleInfo);
    if (!createdArticle) throw new CustomError(400, "Create article FAILED.");
    return createdArticle;
  }

  async getAllArticles(): Promise<Article[]> {
    const allArticles = await this.article.find({
      relations: {
        user: true,
        tags: true,
      },
    });
    if (!allArticles) throw new CustomError(400, "Get all articles FAILED.");
    return allArticles;
  }

  async getArticleFindByPath(path: string) {
    const foundArticle = await this.article.find({
      where: { path },
      relations: { user: true, tags: true },
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
