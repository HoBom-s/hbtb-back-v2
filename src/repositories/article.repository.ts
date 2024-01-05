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
}

/*
() tagControl
() writerControl
() getAllArticleRequest
() getArticlePerPageRequest
() getArticleFindByPathRequest
() getArticleSearchRequest
(WIP) createArticleRequest
() updateArticleRequest
() deleteArticleRequest
 */

/*
id // WIP_check uuid creation
thumbnail
title
subtitle
contents
path
userId(writer) // WIP_check field name
tags
*/
