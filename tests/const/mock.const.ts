import { Readable } from "stream";
import User from "../../src/entities/user.entity";
import { CreateArticle } from "../../src/types/article.type";
import { MulterFile } from "../../src/types/image.type";
import Article from "../../src/entities/article.entity";
import Tag from "../../src/entities/tag.entity";

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

export const newArticleInfo: CreateArticle = {
  thumbnail: thumbnailFile,
  title: "title",
  subtitle: "subtitle",
  contents: "testContent",
  userId: "userId",
  path: "testArticle",
  tags: "tag1",
};

export const user: User = {
  id: "userId",
  nickname: "testUser",
  password: "testPassword",
  profileImg: "testProfileImgUrl",
  role: "user",
  introduction: "testIntro",
  createdAt: new Date("2024-07-31"),
  updatedAt: new Date("2024-07-31"),
};

export const createdArticle: Article = {
  id: "articleId",
  ...newArticleInfo,
  thumbnail: "testImgUrl",
  user,
  tags: [{ id: "tagId", title: "tag1" } as Tag],
  createdAt: new Date("2024-07-31"),
  updatedAt: new Date("2024-07-31"),
};
