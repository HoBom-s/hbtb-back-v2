import Joi from "joi";

export type PossibleNull<T> = T | null | undefined;

export type ValidateSchema = {
  [key: string]: Joi.StringSchema | Joi.ArraySchema;
};

export type RequestUserId = {
  userId: string;
  reissuedAccessToken?: string;
};
