import User from "../entities/user.entity";

export type TNewArticleInfo = {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  path: string;
  tags: string[];
};

export type TCreateArticle = {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  userId: string;
  path: string;
  tags: string[];
};

export type TCreateArticleWithTagId = {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  user: User;
  path: string;
  tags: string[];
};

export type TUpdateArticle = {
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  contents?: string;
  path?: string;
};
