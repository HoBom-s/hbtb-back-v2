import Article from "../entities/article.entity";
import { MulterFile } from "./image.type";

export type Role = "user" | "admin";

export interface CreateUserBody {
  nickname: string;
  password: string;
  introduction: string;
}

export interface CreateUserWithProfileImg {
  nickname: string;
  password: string;
  profileImg?: MulterFile;
  introduction: string;
}

export interface CreateUserWithProfileImgUrl {
  nickname: string;
  password: string;
  profileImg: string;
  introduction: string;
}

export interface LoginUser {
  nickname: string;
  password: string;
}

export interface UpdateUser {
  nickname?: string;
  password?: string;
  profileImg?: string;
  introduction?: string;
}

export interface UserWithoutPassword {
  id: string;
  nickname: string;
  profileImg: string;
  role: Role;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword {
  id: string;
  password: string;
  nickname: string;
  profileImg: string;
  role: Role;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
  articles: Article[];
}
