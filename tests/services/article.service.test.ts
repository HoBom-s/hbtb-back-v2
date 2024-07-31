import { Readable } from "stream";
import { ArticleRepository } from "../../src/repositories/article.repository";
import { ArticleService } from "../../src/services/article.service";
import { ImageService } from "../../src/services/image.service";
import { TagService } from "../../src/services/tag.service";
import { UserService } from "../../src/services/user.service";
import { CreateArticle } from "../../src/types/article.type";
import { MulterFile } from "../../src/types/image.type";
import Tag from "../../src/entities/tag.entity";
import { UserWithoutPassword } from "../../src/types/user.type";
import Article from "../../src/entities/article.entity";
import User from "../../src/entities/user.entity";

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

  let newArticleInfo: CreateArticle;
  let user: User;

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

    const thumbnailFile: MulterFile = {
      fieldname: "thumbnail",
      originalname: "thumbnail.png",
      encoding: "7bit",
      mimetype: "image/png",
      size: 1024,
      destination: "uploads/",
      filename: "thumbnail.png",
      path: "uploads/thumbnail.png",
      buffer: Buffer.from(""),
      stream: new Readable(),
    };

    newArticleInfo = {
      thumbnail: thumbnailFile,
      title: "title",
      subtitle: "subtitle",
      contents: "testContent",
      userId: "userId",
      path: "testArticle",
      tags: "tag1",
    };

    user = {
      id: "userId",
      nickname: "testUser",
      password: "testPassword",
      profileImg: "testProfileImgUrl",
      role: "user",
      introduction: "testIntro",
      createdAt: new Date("2024-07-31"),
      updatedAt: new Date("2024-07-31"),
    };
  });

  describe("createArticle", () => {
    it("should create one article successfully", async () => {
      const createdArticle: Article = {
        id: "articleId",
        ...newArticleInfo,
        thumbnail: "testImgUrl",
        user,
        tags: [{ id: "tagId", title: "tag1" } as Tag],
        createdAt: new Date("2024-07-31"),
        updatedAt: new Date("2024-07-31"),
      };

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
});
