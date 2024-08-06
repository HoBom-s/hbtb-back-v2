export type Role = "user" | "admin";

export interface UserWithoutPassword {
  id: string;
  nickname: string;
  profileImg: string;
  role: Role;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
}
