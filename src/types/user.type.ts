import { Article } from "../entities/article.entity";

export type TRole = "user" | "admin";

export type TCreateUser = {
  nickname: string;
  password: string;
  profileImg?: string;
  introduction: string;
};

export type TLoginUser = {
  nickname: string;
  password: string;
};

export type TUpdateUser = {
  nickname?: string;
  password?: string;
  profileImg?: string;
  introduction?: string;
};

export type TUserWithoutPassword = {
  id: string;
  nickname: string;
  profileImg: string;
  role: TRole;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TUserWithPassword = {
  id: string;
  password: string;
  nickname: string;
  profileImg: string;
  role: TRole;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
  articles: Article[];
};
