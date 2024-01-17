import { NextFunction, Request, Response } from "express";
import bodyValidationHelper from "../helpers/body.helper";
import { CustomError } from "./error.middleware";

function bodyValidateMiddleware(target: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const requestBody = req.body;
    const isBodyValidate = Object.keys(requestBody).every((body) => {
      return body in bodyValidationHelper[target];
    });
    if (!isBodyValidate)
      throw new CustomError(400, "Request body validation failed.");
  };
}

export default bodyValidateMiddleware;
