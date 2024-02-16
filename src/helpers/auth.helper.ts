import jwt from "jsonwebtoken";

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

  verifyRefreshToken(token: string) {
    try {
      const decodedRefreshToken = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET_KEY as string,
      );

      if (typeof decodedRefreshToken === "object") {
        const currentTime = Math.floor(Date.now() / 1000);
        const tokenExpirationTime = decodedRefreshToken.exp || 0;
        return tokenExpirationTime > currentTime;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  verifyAccessToken(token: string) {
    try {
      const decodedAccessToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_KEY as string,
      );

      if (typeof decodedAccessToken === "object") {
        return decodedAccessToken.userId;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}

export default AuthHelper;
