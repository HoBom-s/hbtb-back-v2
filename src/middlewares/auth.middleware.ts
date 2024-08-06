import { NextFunction, Request, Response } from "express";
import { CustomError } from "./error.middleware";
import AuthHelper from "../helpers/auth.helper";
import { RequestUserId } from "../types/auth.type";

const authHelper = new AuthHelper();

async function authValidateMiddleware(
  req: Request & { authInfo?: RequestUserId },
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      throw new CustomError(
        401,
        "Error: Authorization header missing. Please include the 'Authorization' header with valid authentication credentials.",
      );

    const isBearerExists = authHeader.startsWith("Bearer");

    if (!isBearerExists)
      throw new CustomError(
        401,
        "Error: `Bearer` missing in Authorization header.",
      );

    const accessToken = authHeader.split(" ")[1];

    const refreshToken = req.cookies.refreshToken;

    const isAccessTokenValid = authHelper.verifyToken(accessToken, "access");

    const isRefreshTokenValid = authHelper.verifyToken(refreshToken, "refresh");

    if (!isAccessTokenValid && !isRefreshTokenValid) {
      throw new CustomError(
        401,
        "Error: Access and Refresh tokens both expired. Please login again to continue accessing the resources.",
      );
    }

    if (!isAccessTokenValid) {
      const userId = authHelper.getUserIdFromToken(refreshToken, "refresh");

      const reissuedAccessToken = authHelper.createToken(userId, "access");

      req.authInfo = { userId, reissuedAccessToken };

      next();

      return;
    }

    const userId = authHelper.getUserIdFromToken(accessToken, "access");

    req.authInfo = { userId };

    next();
  } catch (error) {
    next(error);
  }
}

export default authValidateMiddleware;
