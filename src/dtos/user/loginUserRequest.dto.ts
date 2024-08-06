import { IsNotEmpty, IsString } from "class-validator";

class LoginUserRequestDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default LoginUserRequestDto;
