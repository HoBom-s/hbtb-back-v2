import { ArticleRepository } from "../../src/repositories/article.repository";
import { ArticleService } from "../../src/services/article.service";
import { ImageService } from "../../src/services/image.service";
import { TagService } from "../../src/services/tag.service";
import { UserService } from "../../src/services/user.service";
import Tag from "../../src/entities/tag.entity";
import { UserWithoutPassword } from "../../src/types/user.type";
import { newArticleInfo, createdArticle } from "../const/staticMocks";

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
    it("should create one article successfully", async () => {
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
  });

  // describe("updateArticle", () => {
  //   it("should update the specified article successfully", async () => {});
  // });
});
