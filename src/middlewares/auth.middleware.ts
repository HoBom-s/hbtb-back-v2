import { NextFunction, Request, Response } from "express";
import { CustomError } from "./error.middleware";
import AuthHelper from "../helpers/auth.helper";

const authHelper = new AuthHelper();

function authValidateMiddleware(
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new CustomError(400, "Missing Authorization header.");
  const isBearerExists = authHeader.startsWith("Bearer");
  if (!isBearerExists) throw new CustomError(400, "Missing Bearer.");

  const accessToken = authHeader.split(" ")[1];
  const userId = authHelper.verifyAccessToken(accessToken);
  if (!userId) throw new CustomError(400, "Please check the access token");
  req.userId = userId;
  next();
}

export default authValidateMiddleware;
