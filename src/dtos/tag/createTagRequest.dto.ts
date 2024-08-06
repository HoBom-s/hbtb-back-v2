import { IsNotEmpty, IsString } from "class-validator";

class CreateTagRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  path: string;
}

export default CreateTagRequestDto;
