import CreateArticleRequestDto from "../dtos/article/createArticleRequest.dto";
import UpdateArticleRequestDto from "../dtos/article/updateArticleRequest.dto";
import Article from "../entities/article.entity";
import { CustomError } from "../middlewares/error.middleware";
import { ArticleRepository } from "../repositories/article.repository";
import {
  ArticlePagination,
  TCreateArticleWithTagId,
} from "../types/article.type";
import { TUserWithoutPassword } from "../types/user.type";
import { TagService } from "./tag.service";
import { UserService } from "./user.service";

export class ArticleService {
  private articleRepository: ArticleRepository;

  private tagService: TagService;

  private userService: UserService;

  constructor() {
    this.articleRepository = new ArticleRepository();
    this.tagService = new TagService();
    this.userService = new UserService();
  }

  async createArticle(
    userId: string,
    createArticleRequestDto: CreateArticleRequestDto,
  ): Promise<Article> {
    const { thumbnail, title, subtitle, contents, path, tags } =
      createArticleRequestDto;

    const foundArticle = await this.getArticleFindByPath(path);

    if (foundArticle) throw new CustomError(400, "Article already exists.");

    const tagIds: string[] = [];

    for (const tag of tags) {
      const foundTag = await this.tagService.getOneTagByTitle(tag);

      if (!foundTag) throw new CustomError(404, "Tag not found.");

      tagIds.push(foundTag.id);
    }

    const articleWriter: TUserWithoutPassword =
      await this.userService.findOneUserById(userId);

    const newArticleInfo: TCreateArticleWithTagId = {
      thumbnail,
      title,
      subtitle,
      contents,
      user: articleWriter,
      path,
      tags: tagIds,
    };

    const createdArticle =
      await this.articleRepository.createArticle(newArticleInfo);

    await this.tagService.saveArticleId(tags, createdArticle.id);

    return createdArticle;
  }

  getAllArticles() {
    return this.articleRepository.getAllArticles();
  }

  getArticleFindByPath(path: string) {
    return this.articleRepository.getArticleFindByPath(path);
  }

  async updateArticle(
    articleId: string,
    userId: string,
    updateArticleREquestDto: UpdateArticleRequestDto,
  ): Promise<Article> {
    const foundArticle = await this.articleRepository.getArticleById(articleId);

    const writerId = foundArticle.user.id;

    this.validateUser(writerId, userId, "update");

    await this.articleRepository.updateArticle(
      articleId,
      updateArticleREquestDto,
    );

    const updatedArticle = this.articleRepository.getArticleById(articleId);

    return updatedArticle;
  }

  async removeArticle(articleId: string, userId: string) {
    const foundArticle = await this.articleRepository.getArticleById(articleId);

    const writerId = foundArticle.user.id;

    this.validateUser(writerId, userId, "remove");

    return this.articleRepository.removeArticle(articleId);
  }

  searchArticle(keyword: string): Promise<Article[]> {
    return this.articleRepository.searchArticle(keyword);
  }

  async getArticlePerPage(
    strPageNumber: string,
    strPerPage: string,
  ): Promise<ArticlePagination> {
    const pageNumber: number = Number.parseInt(strPageNumber);

    const perPage: number = Number.parseInt(strPerPage);

    const foundArticles = await this.articleRepository.getArticlePerPage(
      pageNumber,
      perPage,
    );

    const totalPageCount =
      await this.articleRepository.getTotalPageCount(perPage);

    return { foundArticles, totalPageCount };
  }

  validateUser(writerId: string, userId: string, type: string) {
    if (writerId !== userId)
      throw new CustomError(401, `Only the writer can ${type} the article.`);

    return;
  }
}
