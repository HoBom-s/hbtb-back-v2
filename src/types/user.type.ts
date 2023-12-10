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
