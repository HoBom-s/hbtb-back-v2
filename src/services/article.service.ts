import { Article } from "../entities/article.entity";
import { CustomError } from "../middleware/error.middleware";
import { ArticleRepository } from "../repositories/article.repository";
import { TCreateArticle, TCreateArticleWithTagId } from "../types/article.type";
import { TagRepository } from "../repositories/tag.repository";

export class ArticleService {
  private articleRepository: ArticleRepository;
  private tagRepository: TagRepository;

  constructor() {
    this.articleRepository = new ArticleRepository();
  }

  async createArticle(newArticleInfo: TCreateArticle): Promise<Article> {
    const { thumbnail, title, subtitle, contents, userId, path, tags } =
      newArticleInfo;
    const foundArticle = await this.getArticleFindByPath(path);
    if (foundArticle) throw new CustomError(400, "Article already exists.");

    for (const tag of tags) {
      await this.tagRepository.createTag(tag);
    }

    const newArticleInfoWithTagId: TCreateArticleWithTagId = {
      thumbnail,
      title,
      subtitle,
      contents,
      userId,
      path,
      tags,
    };
    return this.articleRepository.createArticle(newArticleInfoWithTagId);
  }

  // WIP: getting tag info
  getAllArticles() {
    return this.articleRepository.getAllArticles();
  }

  getArticleFindByPath(path: string) {
    return this.articleRepository.getArticleFindByPath(path);
  }
}
