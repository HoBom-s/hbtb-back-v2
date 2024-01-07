import { Article } from "../entities/article.entity";
import { ArticleRepository } from "../repositories/article.repository";
import { TCreateArticle } from "../types/article.type";

export class ArticleService {
  private articleRepository: ArticleRepository;

  constructor() {
    this.articleRepository = new ArticleRepository();
  }

  createArticle(newArticleInfo: TCreateArticle): Promise<Article> {
    return this.articleRepository.createArticle(newArticleInfo);
  }

  getAllArticles() {
    return this.articleRepository.getAllArticles();
  }

  getArticleFindByPath(path: string) {
    return this.articleRepository.getArticleFindByPath(path);
  }
}
