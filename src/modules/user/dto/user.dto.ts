export class UserDto {
  id: string;
  nickname: string;
  password: string;
  profileImg: string;
  role: "admin" | "user";
  introduction: string;
}
