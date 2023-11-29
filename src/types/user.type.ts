export type TRole = "user" | "admin";

export type TCreateUser = {
  nickname: string;
  password: string;
  profileImg?: string;
  introduction: string;
};
