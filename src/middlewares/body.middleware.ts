import { NextFunction, Request, Response } from "express";
import ValidateHelper from "../helpers/validate.helper";
import { CustomError } from "./error.middleware";

function bodyValidateMiddleware(target: string) {
  const validateHelper = new ValidateHelper();

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const bodies = req.body;
      if (!bodies) throw new CustomError(400, "Missing req.body.");

      const isBodyValidate = await validateHelper
        .asJoiSchema(target)
        .validateAsync(bodies);
      if (!isBodyValidate)
        throw new CustomError(400, "Req.body validation failed.");

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default bodyValidateMiddleware;
