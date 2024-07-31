import { Request, Response, NextFunction } from "express";
import ValidateHelper from "../helpers/validate.helper";
import { CustomError } from "./error/error.middleware";

function paramValidateMiddleware(target: string) {
  const validateHelper = new ValidateHelper();

  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params;
      if (!params)
        throw new CustomError(
          400,
          "Error: Required parameter missing. Please ensure that all required parameters are provided.",
        );

      const isParamValidate = validateHelper
        .asJoiSchema(target)
        .validateAsync(params);

      if (!isParamValidate)
        throw new CustomError(
          400,
          "Error: Required parameter missing. Please ensure that all required parameters are provided.",
        );

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default paramValidateMiddleware;
