import { Tag } from "../entities/tag.entity";

export type TNewArticleInfo = {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  path: string;
  tags: Tag[];
};

export type TCreateArticle = {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  userId: string;
  path: string;
  tags: Tag[];
};
