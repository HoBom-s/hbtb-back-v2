import { NextFunction, Request, Response } from "express";
import ValidateHelper from "../helpers/validate.helper";
import { CustomError } from "./error/error.middleware";

function bodyValidateMiddleware(target: string) {
  const validateHelper = new ValidateHelper();

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const bodies = req.body;
      if (!bodies)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const isBodyValidate = await validateHelper
        .asJoiSchema(target)
        .validateAsync(bodies);

      if (!isBodyValidate)
        throw new CustomError(
          400,
          "Error: Request body validation failed. Please ensure that the provided data in the request body meets the required format and criteria.",
        );

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default bodyValidateMiddleware;
