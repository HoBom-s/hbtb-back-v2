import { IsNotEmpty, IsOptional, IsString } from "class-validator";

class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  profileImg?: string;

  @IsString()
  @IsNotEmpty()
  introduction: string;
}

export default CreateUserRequestDto;
