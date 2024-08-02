import jwt, { TokenExpiredError } from "jsonwebtoken";
import { CustomError } from "../middlewares/error/error.middleware";
import { RequestUserId, TokenType } from "../types/auth.type";

class AuthHelper {
  constructor() {}

  createToken(userId: string, tokenType: TokenType) {
    const secretKey = this.getSecretKey(tokenType);
    const exp = this.getExp(tokenType);

    const token = jwt.sign({ userId }, secretKey, {
      expiresIn: exp,
    });

    return token;
  }

  getUserIdFromToken(validToken: string, tokenType: TokenType) {
    try {
      const secretKey = this.getSecretKey(tokenType);
      const decodedToken = jwt.verify(validToken, secretKey);

      if (typeof decodedToken === "string") return false;

      return decodedToken.userId;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new CustomError(
          401,
          `Error: Get userId from ${tokenType} token failed.`,
        );
      }
    }
  }

  verifyToken(token: string, tokenType: TokenType) {
    try {
      const secretKey = this.getSecretKey(tokenType);
      const decodedToken = jwt.verify(token, secretKey);

      if (typeof decodedToken === "string") return false;

      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExpirationTime = decodedToken.exp!;

      return tokenExpirationTime > currentTime;
    } catch (error) {
      if (error instanceof TokenExpiredError) return null;
    }
  }

  getSecretKey(tokenType: TokenType) {
    const secretKey =
      tokenType === "access"
        ? (process.env.ACCESS_TOKEN_SECRET_KEY as string)
        : (process.env.REFRESH_TOKEN_SECRET_KEY as string);

    return secretKey;
  }

  getExp(tokenType: TokenType) {
    const exp =
      tokenType === "access"
        ? (process.env.ACCESS_TOKEN_EXPIRE_TIME as string)
        : (process.env.REFRESH_TOKEN_EXPIRE_TIME as string);

    return exp;
  }

  validateAuthInfo(authInfo?: RequestUserId) {
    if (!authInfo)
      throw new CustomError(
        401,
        "Error: request `authInfo` missing. Please provide valid userId or reissuedToken.",
      );

    const { userId, reissuedAccessToken } = authInfo;
    if (!userId)
      throw new CustomError(401, "Error: userId missing in req.authInfo.");

    return { userId, reissuedAccessToken };
  }
}

export default AuthHelper;
