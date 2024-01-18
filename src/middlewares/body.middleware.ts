import { NextFunction, Request, Response } from "express";
import validateHelper from "../helpers/validate.helper";
import { CustomError } from "./error.middleware";

function bodyValidateMiddleware(target: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const requestBody = req.body;
    const isBodyValidate = Object.keys(requestBody).every((body) => {
      return body in validateHelper[target];
    });
    if (!isBodyValidate)
      throw new CustomError(400, "Request body validation failed.");
    next();
  };
}

export default bodyValidateMiddleware;
