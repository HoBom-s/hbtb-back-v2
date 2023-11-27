export class createUserDto {
  nickname: string;
  password: string;
  profileImg: string;
  role: "admin" | "user";
  introduction: string;
}
