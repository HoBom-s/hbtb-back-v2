import { NextFunction, Request, Response } from "express";
import { CustomError } from "./error.middleware";
import AuthHelper from "../helpers/auth.helper";
import { RequestUserId } from "../types/common.type";

const authHelper = new AuthHelper();

async function authValidateMiddleware(
  req: Request & { userId?: RequestUserId },
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new CustomError(401, "Missing Authorization header.");

  const isBearerExists = authHeader.startsWith("Bearer");
  if (!isBearerExists) throw new CustomError(401, "Missing Bearer.");

  const accessToken = authHeader.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;

  // WIP accesstoken, refreshtoken 유효여부 확인
  const isAccessTokenValid = authHelper.verifyToken(accessToken, "access");
  const isRefreshTokenValid = authHelper.verifyToken(refreshToken, "refresh");

  if (!isAccessTokenValid && !isRefreshTokenValid) {
    throw new CustomError(
      401,
      "Access & Refresh token both expired. Please login again.",
    );
  }

  if (!isAccessTokenValid) {
    const userId = authHelper.getUserIdFromToken(refreshToken, "refresh");
    const reissuedAccessToken = authHelper.createAccessToken(userId);
    req.userId = { userId, reissuedAccessToken };
  }

  const userId = authHelper.getUserIdFromToken(accessToken, "access");

  req.userId = { userId };

  next();
}

export default authValidateMiddleware;
