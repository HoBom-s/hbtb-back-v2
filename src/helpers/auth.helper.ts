import jwt, { TokenExpiredError } from "jsonwebtoken";
import { CustomError } from "../middlewares/error.middleware";

class AuthHelper {
  constructor() {}

  createAccessToken(userId: string) {
    const accessToken = jwt.sign(
      { userId },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      },
    );

    return accessToken;
  }

  createRefreshToken(userId: string) {
    const refreshToken = jwt.sign(
      {
        userId,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
      },
    );

    return refreshToken;
  }

  getUserIdFromToken(validToken: string, tokenType: string) {
    try {
      const secretKey = this.getSecretKey(tokenType);
      const decodedToken = jwt.verify(validToken, secretKey);

      if (typeof decodedToken === "string") return false;

      return decodedToken.userId;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new CustomError(
          401,
          `Get userId from ${tokenType} token failed.`,
        );
      }
    }
  }

  verifyToken(token: string, tokenType: string) {
    try {
      const secretKey = this.getSecretKey(tokenType);
      const decodedToken = jwt.verify(token, secretKey);

      // Question : type string?
      if (typeof decodedToken === "string") return false;

      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExpirationTime = decodedToken.exp!;

      return tokenExpirationTime > currentTime;
    } catch (error) {
      if (error instanceof TokenExpiredError) return null;
    }
  }

  getSecretKey(tokenType: string) {
    const secretKey =
      tokenType === "access"
        ? (process.env.ACCESS_TOKEN_SECRET_KEY as string)
        : (process.env.REFRESH_TOKEN_SECRET_KEY as string);

    return secretKey;
  }
}

export default AuthHelper;
