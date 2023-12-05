import jwt, { JwtPayload } from "jsonwebtoken";

class AuthHelper {
  constructor() {}

  createAccessToken(id: string) {
    const accessToken = jwt.sign(
      { id },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      }
    );

    return accessToken;
  }

  createRefreshToken(id: string) {
    const refreshToken = jwt.sign(
      {
        id,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
      }
    );

    return refreshToken;
  }

  verifyRefreshToken(token: string) {
    try {
      const decodedRefreshToken = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET_KEY as string
      );

      if (typeof decodedRefreshToken === "object") {
        const currentTime = Date.now() / 1000;
        const tokenExpirationTime = decodedRefreshToken.exp || 0;
        return tokenExpirationTime > currentTime;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

export default AuthHelper;
