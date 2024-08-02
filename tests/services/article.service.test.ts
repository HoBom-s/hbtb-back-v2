import { ArticleRepository } from "../../src/repositories/article.repository";
import { ArticleService } from "../../src/services/article.service";
import { ImageService } from "../../src/services/image.service";
import { TagService } from "../../src/services/tag.service";
import { UserService } from "../../src/services/user.service";
import Tag from "../../src/entities/tag.entity";
import { UserWithoutPassword } from "../../src/types/user.type";
import { newArticleInfo, createdArticle } from "../const/mock.const";
import { CustomError } from "../../src/middlewares/error/error.middleware";
import { ErrorMessage } from "../../src/middlewares/error/error.enum";

jest.mock("../../src/repositories/article.repository.ts");
jest.mock("../../src/services/tag.service.ts");
jest.mock("../../src/services/user.service.ts");
jest.mock("../../src/services/image.service.ts");

describe("ArticleService", () => {
  let articleService: ArticleService;
  let articleRespository: jest.Mocked<ArticleRepository>;
  let tagService: jest.Mocked<TagService>;
  let userService: jest.Mocked<UserService>;
  let imageService: jest.Mocked<ImageService>;

  beforeEach(() => {
    articleRespository =
      new ArticleRepository() as jest.Mocked<ArticleRepository>;
    tagService = new TagService() as jest.Mocked<TagService>;
    userService = new UserService() as jest.Mocked<UserService>;
    imageService = new ImageService() as jest.Mocked<ImageService>;

    articleService = new ArticleService();
    articleService["articleRepository"] = articleRespository;
    articleService["tagService"] = tagService;
    articleService["userService"] = userService;
    articleService["imageService"] = imageService;
  });

  describe("createArticle", () => {
    it("should create one article successfully.", async () => {
      articleRespository.getArticleFindByPath.mockResolvedValue(null);

      tagService.getOneTagByTitle.mockResolvedValue({
        id: "tagId",
        title: "tag1",
      } as Tag);

      userService.findOneUserById.mockResolvedValue({
        id: "userId",
      } as UserWithoutPassword);

      imageService.uploadOneImage.mockResolvedValue("testImgUrl");

      articleRespository.createArticle.mockResolvedValue(createdArticle);

      const result = await articleService.createArticle(newArticleInfo);

      expect(result).toEqual(createdArticle);
    });

    it("should throw an error if the article already exists.", async () => {
      articleRespository.getArticleFindByPath.mockResolvedValue(createdArticle);

      await expect(
        articleService.createArticle(newArticleInfo),
      ).rejects.toThrow(CustomError);
      await expect(
        articleService.createArticle(newArticleInfo),
      ).rejects.toThrow(ErrorMessage.ALREADY_EXISTS);
    });

    it("should throw an error if tags not found.", async () => {
      articleRespository.getArticleFindByPath.mockResolvedValue(null);

      tagService.getOneTagByTitle.mockResolvedValue(null);

      await expect(
        articleService.createArticle(newArticleInfo),
      ).rejects.toThrow(CustomError);
      await expect(
        articleService.createArticle(newArticleInfo),
      ).rejects.toThrow(ErrorMessage.NOT_FOUND);
    });

    it("should throw an error if the user not found.", async () => {
      articleRespository.getArticleFindByPath.mockResolvedValue(null);

      tagService.getOneTagByTitle.mockResolvedValue(null);

      userService.findOneUserById.mockResolvedValue(null);

      await expect(
        articleService.createArticle(newArticleInfo),
      ).rejects.toThrow(CustomError);
      await expect(
        articleService.createArticle(newArticleInfo),
      ).rejects.toThrow(ErrorMessage.NOT_FOUND);
    });
  });
});
