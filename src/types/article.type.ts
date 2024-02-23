import { Article } from "../entities/article.entity";
import { Tag } from "../entities/tag.entity";
import { TUserWithoutPassword } from "./user.type";

export interface TNewArticleInfo {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  path: string;
  tags: string[];
}

export interface TCreateArticle {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  userId: string;
  path: string;
  tags: string[];
}

export interface TCreateArticleWithTagId {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  user: TUserWithoutPassword;
  path: string;
  tags: string[];
}

export interface TUpdateArticle {
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
