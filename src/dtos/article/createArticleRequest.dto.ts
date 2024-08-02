import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

class CreateArticleRequestDto {
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  contents: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsArray()
  @IsNotEmpty()
  tags: string[];
}

export default CreateArticleRequestDto;
