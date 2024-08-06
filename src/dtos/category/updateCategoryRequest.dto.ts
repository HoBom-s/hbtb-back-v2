import { IsOptional, IsString } from "class-validator";

class UpdateCategoryRequestDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  spot?: string;
}

export default UpdateCategoryRequestDto;
