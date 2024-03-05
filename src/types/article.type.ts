import Article from "../entities/article.entity";
import Tag from "../entities/tag.entity";
import { UserWithoutPassword } from "./user.type";

export interface NewArticleInfo {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  path: string;
  tags: string[];
}

export interface CreateArticle {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  userId: string;
  path: string;
  tags: string[];
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

export interface UpdateArticle {
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  contents?: string;
  path?: string;
}

export interface ArticlePagination {
  foundArticles: Article[];
  totalPageCount: number;
}
