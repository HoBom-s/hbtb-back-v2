import { ClassConstructor, plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";

async function validateDto<T extends object>(
  body: Request["body"],
  dto: ClassConstructor<T>,
): Promise<T> {
  const dtoInstance = plainToClass(dto, body);

  await validateOrReject(dtoInstance);

  return dtoInstance;
}

export default validateDto;
