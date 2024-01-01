import { Repository } from "typeorm";
import { myDataSource } from "../data-source";
import { Article } from "../entities/article.entity";
import { TCreateArticle } from "../types/article.type";
import { CustomError } from "../middleware/error.middleware";

export class ArticleRepository {
  private article: Repository<Article>;
  constructor() {
    this.article = myDataSource.getRepository(Article);
  }

  createArticle(newArticleInfo: TCreateArticle): Article {
    const createdArticle = this.article.create(newArticleInfo);
    if (!createdArticle)
      throw new CustomError(400, "Problem in creating the article.");
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
