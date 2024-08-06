import CreateArticleRequestDto from "../dtos/article/createArticleRequest.dto";
import UpdateArticleRequestDto from "../dtos/article/updateArticleRequest.dto";
import Article from "../entities/article.entity";
import { CustomError } from "../middlewares/error.middleware";
import { ArticleRepository } from "../repositories/article.repository";
import { ArticlePagination, ArticlePerPageInfo } from "../types/article.type";
import { ImageService } from "./image.service";
import { PossibleNull } from "../types/common.type";
import { TagService } from "./tag.service";
import { UserService } from "./user.service";
import { MulterFile } from "../types/image.type";
import Tag from "../entities/tag.entity";

export class ArticleService {
  private articleRepository: ArticleRepository;

  private tagService: TagService;

  private userService: UserService;

  private imageService: ImageService;

  constructor() {
    this.articleRepository = new ArticleRepository();
    this.tagService = new TagService();
    this.userService = new UserService();
    this.imageService = new ImageService();
  }

  async createArticle(
    userId: string,
    createArticleRequestDto: CreateArticleRequestDto,
    thumbnail: MulterFile,
  ): Promise<Article> {
    const { path, tags } = createArticleRequestDto;

    const foundArticle = await this.getArticleFindByPath(path);

    if (foundArticle) throw new CustomError(400, "Article already exists.");

    const tagsStringToArr: string[] = tags.replace(/\s/g, "").split(",");

    const tagArr: Tag[] = [];

    for (const tagTitle of tagsStringToArr) {
      const foundTag = await this.tagService.getOneTagByTitle(tagTitle);

      if (!foundTag) throw new CustomError(404, "Tag not found.");

      tagArr.push(foundTag);
    }

    const writer = await this.userService.findOneUserById(userId);

    if (!writer) throw new CustomError(404, "User(writer) not found.");

    const thumbnailUrl = await this.imageService.uploadOneImage(
      { image: thumbnail, uniqueString: path },
      "thumbnail",
    );

    const newArticleInfo = {
      ...createArticleRequestDto,
      thumbnail: thumbnailUrl,
      tags: tagArr,
      user: writer,
    };

    const createdArticle =
      await this.articleRepository.createArticle(newArticleInfo);

    return createdArticle;
  }

  getAllArticles(): Promise<Article[]> {
    return this.articleRepository.getAllArticles();
  }

  getArticleFindByPath(path: string): Promise<PossibleNull<Article>> {
    path = "/" + path;
    return this.articleRepository.getArticleFindByPath(path);
  }

  async updateArticle(
    id: string,
    userId: string,
    updateArticleRequestDto: UpdateArticleRequestDto,
    thumbnail?: MulterFile,
  ): Promise<Article> {
    const foundArticle = await this.articleRepository.getArticleById(id);

    const articlePath = foundArticle.path;

    const writerId = foundArticle.user.id;

    this.validateUser(writerId, userId, "update");

    if (thumbnail) {
      const thumbnailUrl = await this.imageService.uploadOneImage(
        { image: thumbnail, uniqueString: articlePath },
        "thumbnail",
      );

      await this.articleRepository.updateArticle(
        id,
        updateArticleRequestDto,
        thumbnailUrl,
      );
    } else {
      await this.articleRepository.updateArticle(id, updateArticleRequestDto);
    }

    const updatedArticle = await this.articleRepository.getArticleById(id);

    return updatedArticle;
  }

  async removeArticle(articleId: string, userId: string) {
    const foundArticle = await this.articleRepository.getArticleById(articleId);

    const writerId = foundArticle.user.id;

    const thumbnailUrl = foundArticle.thumbnail;

    this.validateUser(writerId, userId, "remove");

    await this.imageService.removeOneImage(thumbnailUrl);

    return this.articleRepository.removeArticle(articleId);
  }

  searchArticle(keyword: string): Promise<Article[]> {
    return this.articleRepository.searchArticle(keyword);
  }

  async getArticlePerPage(
    perPageInfo: ArticlePerPageInfo,
  ): Promise<ArticlePagination> {
    const { perPage } = perPageInfo;

    const foundArticles =
      await this.articleRepository.getArticlePerPage(perPageInfo);

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
