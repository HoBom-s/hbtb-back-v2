import { Request, Response, NextFunction } from "express";
import ValidateHelper from "../helpers/validate.helper";
import { CustomError } from "./error.middleware";

function paramValidateMiddleware(target: string) {
  const validateHelper = new ValidateHelper();

  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params;
      if (!params) throw new CustomError(400, "Missing req.params.");

      const isParamValidate = validateHelper
        .asJoiSchema(target)
        .validateAsync(params);

      if (!isParamValidate)
        throw new CustomError(400, "Req.param validation failed.");

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default paramValidateMiddleware;
