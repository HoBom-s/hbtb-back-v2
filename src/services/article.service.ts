import axiosInstance from "../api/image.api";
import Article from "../entities/article.entity";
import Tag from "../entities/tag.entity";
import { CustomError } from "../middlewares/error.middleware";
import { ArticleRepository } from "../repositories/article.repository";
import {
  ArticlePagination,
  CreateArticle,
  CreateArticleWithTagId,
  UpdateArticle,
} from "../types/article.type";
import { PossibleNull } from "../types/common.type";
import { MulterFileArray, UploadImageBodyData } from "../types/image.type";
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

  async createArticle(newArticleInfo: CreateArticle): Promise<Article> {
    const { thumbnail, title, subtitle, contents, userId, path, tags } =
      newArticleInfo;

    const foundArticle = await this.getArticleFindByPath(path);
    if (foundArticle) throw new CustomError(400, "Article already exists.");

    const tagsStringToArr: string[] = tags.replace(" ", "").split(",");

    const tagArr: Tag[] = [];
    for (const tag of tagsStringToArr) {
      const foundTag = await this.tagService.getOneTagByTitle(tag);
      if (!foundTag) throw new CustomError(404, "Tag not found.");
      tagArr.push(foundTag);
    }

    const articleWriter = await this.userService.findOneUserById(userId);
    if (!articleWriter) throw new CustomError(404, "User(writer) not found.");

    const thumbnailUrl = await this.uploadImages(thumbnail);

    const newArticleInfoWithTagId: CreateArticleWithTagId = {
      thumbnail: thumbnailUrl,
      title,
      subtitle,
      contents,
      user: articleWriter,
      path,
      tags: tagArr,
    };

    const createdArticle = await this.articleRepository.createArticle(
      newArticleInfoWithTagId,
    );

    return createdArticle;
  }

  async uploadImages(thumbnail: PossibleNull<MulterFileArray>) {
    if (!thumbnail) return null;

    const thumbnailInfo: UploadImageBodyData = Object.values(thumbnail)
      .flat()
      .map((file) => {
        const { originalname, buffer, ...restInfo } = file;
        return { originalname, buffer };
      });

    const response = await axiosInstance.post("/images", thumbnailInfo);

    return response.data;
  }

  getAllArticles(): Promise<Article[]> {
    return this.articleRepository.getAllArticles();
  }

  getArticleFindByPath(path: string): Promise<PossibleNull<Article>> {
    return this.articleRepository.getArticleFindByPath(path);
  }

  async updateArticle(
    articleId: string,
    userId: string,
    updatedInfo: UpdateArticle,
  ): Promise<Article> {
    const foundArticle = await this.articleRepository.getArticleById(articleId);

    const writerId = foundArticle.user.id;

    this.validateUser(writerId, userId, "update");

    await this.articleRepository.updateArticle(articleId, updatedInfo);

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
