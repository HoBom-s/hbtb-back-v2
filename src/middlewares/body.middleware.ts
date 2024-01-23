import { NextFunction, Request, Response } from "express";
import ValidateHelper from "../helpers/validate.helper";
import { CustomError } from "./error.middleware";

function bodyValidateMiddleware(target: string) {
  const validateHelper = new ValidateHelper();

  return function (req: Request, res: Response, next: NextFunction) {
    const bodies = req.body;
    const isBodyValidate = validateHelper.asJoiSchema(target).validate(bodies);
    if (!isBodyValidate)
      throw new CustomError(400, "Request body validation failed.");
    next();
  };
}

export default bodyValidateMiddleware;
