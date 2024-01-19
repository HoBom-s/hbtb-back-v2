import { Request, Response, NextFunction } from "express";
import validateHelper from "../helpers/validate.helper";
import { CustomError } from "./error.middleware";

function paramValidateMiddleware(target: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const params = req.params;
    const isParamValidate = validateHelper.asJoiSchema(target).validate(params);
    if (!isParamValidate)
      throw new CustomError(400, "Request param validation failed.");
    next();
  };
}

export default paramValidateMiddleware;
