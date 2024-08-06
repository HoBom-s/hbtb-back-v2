import { IsString, IsNotEmpty } from "class-validator";

class CreateCategoryRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  spot: string;
}

export default CreateCategoryRequestDto;
