import { IsOptional, IsString } from "class-validator";

class UpdateUserRequestDto {
  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  profileImg?: string;

  @IsString()
  @IsOptional()
  introduction?: string;
}

export default UpdateUserRequestDto;
