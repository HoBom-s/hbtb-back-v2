export type TRole = "user" | "admin";

export interface TUserWithoutPassword {
  id: string;
  nickname: string;
  profileImg: string;
  role: TRole;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
}
