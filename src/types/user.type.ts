import { Article } from "../entities/article.entity";

export type TRole = "user" | "admin";

export interface TCreateUser {
  nickname: string;
  password: string;
  profileImg?: string;
  introduction: string;
}

export interface TLoginUser {
  nickname: string;
  password: string;
}

export interface TUpdateUser {
  nickname?: string;
  password?: string;
  profileImg?: string;
  introduction?: string;
}

export interface TUserWithoutPassword {
  id: string;
  nickname: string;
  profileImg: string;
  role: TRole;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TUserWithPassword {
  id: string;
  password: string;
  nickname: string;
  profileImg: string;
  role: TRole;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
  articles: Article[];
}
