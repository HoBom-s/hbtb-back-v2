import Joi from "joi";

export type PossibleNull<T> = T | null | undefined;
export type ValidateObject = {
  [key: string]: Joi.StringSchema | Joi.ArraySchema;
};
