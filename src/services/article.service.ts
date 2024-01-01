import { Article } from "../entities/article.entity";
import { ArticleRepository } from "../repositories/article.repository";
import { TCreateArticle } from "../types/article.type";

export class ArticleService {
  private articleRepository: ArticleRepository;
  contructor() {
    this.articleRepository = new ArticleRepository();
  }

  createArticle(newArticleInfo: TCreateArticle): Article {
    const createdArticle = this.articleRepository.createArticle(newArticleInfo);
    return createdArticle;
  }
}
