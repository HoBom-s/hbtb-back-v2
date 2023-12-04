import jwt from "jsonwebtoken";

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
}

export default AuthHelper;
