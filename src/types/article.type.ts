import QueryString from "qs";
import Article from "../entities/article.entity";
import Tag from "../entities/tag.entity";
import { MulterFile } from "./image.type";
import { UserWithoutPassword } from "./user.type";

export interface NewArticleInfo {
  title: string;
  subtitle: string;
  contents: string;
  path: string;
  tags: string;
}

export interface CreateArticle {
  thumbnail: MulterFile;
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
  thumbnail?: MulterFile;
  title?: string;
  subtitle?: string;
  contents?: string;
  path?: string;
}

export interface UpdateArticleWithThumbnail {
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  contents?: string;
  path?: string;
}

type SORTING = "asc" | "ASC" | "desc" | "DESC" | undefined;

export interface ArticlePerPageInfo {
  pageNumber: number;
  perPage: number;
  sorting?: SORTING;
}

export function isSORTING(
  value:
    | string
    | QueryString.ParsedQs
    | string[]
    | QueryString.ParsedQs[]
    | undefined,
): value is SORTING {
  return (
    value === "asc" ||
    value === "ASC" ||
    value === "desc" ||
    value === "DESC" ||
    value === undefined
  );
}

export interface ArticlePagination {
  foundArticles: Article[];
  totalPageCount: number;
}
