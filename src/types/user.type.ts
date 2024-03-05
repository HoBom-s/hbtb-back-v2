import Article from "../entities/article.entity";

export type Role = "user" | "admin";

export interface CreateUser {
  nickname: string;
  password: string;
  profileImg?: string;
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
