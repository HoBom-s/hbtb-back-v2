import Article from "../entities/article.entity";
import { TUserWithoutPassword } from "./user.type";

export interface TNewArticleInfoWithUser {
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

export interface ArticlePagination {
  foundArticles: Article[];
  totalPageCount: number;
}
