import QueryString from "qs";
import Article from "../entities/article.entity";
import Tag from "../entities/tag.entity";
import { UserWithoutPassword } from "./user.type";

export interface CreateArticleWithUserAndTag {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  path: string;
  tags: Tag[];
  user: UserWithoutPassword;
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
