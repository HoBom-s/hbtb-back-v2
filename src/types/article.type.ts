import Article from "../entities/article.entity";
import Tag from "../entities/tag.entity";
import { MulterFileArray } from "./image.type";
import { UserWithoutPassword } from "./user.type";

export interface NewArticleInfo {
  title: string;
  subtitle: string;
  contents: string;
  path: string;
  tags: string;
}

export interface CreateArticle {
  thumbnail: MulterFileArray;
  title: string;
  subtitle: string;
  contents: string;
  userId: string;
  path: string;
  tags: string;
}

export interface CreateArticleWithTagId {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  user: UserWithoutPassword;
  path: string;
  tags: Tag[];
}

export interface UpdateArticleBody {
  title?: string;
  subtitle?: string;
  contents?: string;
  path?: string;
}

export interface UpdateArticleInfo {
  updatedThumbnail: MulterFileArray;
  title?: string;
  subtitle?: string;
  contents?: string;
  path?: string;
}

export interface UpdateArticleWithThumbnail {
  thumbnail: string;
  title?: string;
  subtitle?: string;
  contents?: string;
  path?: string;
}

export interface ArticlePagination {
  foundArticles: Article[];
  totalPageCount: number;
}
