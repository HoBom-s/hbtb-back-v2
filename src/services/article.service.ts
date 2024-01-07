import { Article } from "../entities/article.entity";
import { ArticleRepository } from "../repositories/article.repository";
import { TCreateArticle } from "../types/article.type";

export class ArticleService {
  private articleRepository: ArticleRepository;

  contructor() {
    this.articleRepository = new ArticleRepository();
  }

  createArticle(newArticleInfo: TCreateArticle): Article {
    // WIP "Cannot read properties of undefined (reading 'createArticle')"
    const createdArticle = this.articleRepository.createArticle(newArticleInfo);
    return createdArticle;
  }

  getAllArticles() {
    return this.articleRepository.getAllArticles();
  }

  getArticleFindByPath(path: string) {
    return this.articleRepository.getArticleFindByPath(path);
  }
}
