import { IsOptional, IsString } from "class-validator";

class UpdateArticleRequestDto {
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  contents?: string;

  @IsString()
  @IsOptional()
  path?: string;
}

export default UpdateArticleRequestDto;
