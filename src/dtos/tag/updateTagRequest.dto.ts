import { IsOptional, IsString } from "class-validator";

class UpdateTagRequestDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  path?: string;
}

export default UpdateTagRequestDto;
