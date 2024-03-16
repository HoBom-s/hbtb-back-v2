import { Request, Response, NextFunction } from "express";
import {
  CreateUserBody,
  CreateUserWithProfileImg,
  LoginUser,
  UpdateUserBody,
  UpdateUserWithProfileImg,
} from "../types/user.type";
import { UserService } from "../services/user.service";
import { CustomError } from "../middlewares/error.middleware";
import { Auth } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";
import { MulterFile } from "../types/image.type";
import { redisClient } from "../redis/redis.config";

export class UserController {
  private userService: UserService;
  private authHelper: AuthHelper;

  constructor() {
    this.userService = new UserService();
    this.authHelper = new AuthHelper();
  }

  async getUserInfo(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );

      const foundUser = await this.userService.findOneUserById(userId);

      // WIP
      const stringifiedFoundUser = JSON.stringify(foundUser);

      const key = `redis_${req.method}_${req.originalUrl}`;
      await redisClient.set(key, stringifiedFoundUser);

      return res.json({
        status: 200,
        message: "Get user info success.",
        data: { foundUser, reissuedAccessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const profileImg = req.file as MulterFile;
      const newUserInfo: CreateUserBody = req.body;

      if (!newUserInfo)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const newUserInfoWithProfileImg: CreateUserWithProfileImg = {
        profileImg,
        ...newUserInfo,
      };
      const createdUser = await this.userService.createUser(
        newUserInfoWithProfileImg,
      );

      return res.json({
        status: 201,
        message: "Create user success.",
        data: { createdUser },
      });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const loginInfo: LoginUser = req.body;

      if (!loginInfo)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const { accessToken, refreshToken } =
        await this.userService.loginUser(loginInfo);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14days in milliseconds
      });

      return res.json({
        status: 200,
        message: "Login success.",
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.json({
        status: 201,
        message: "Logout success.",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );
      if (id !== userId)
        throw new CustomError(401, "Error: User not identical.");

      const updatedProfileImg = req.file as MulterFile;
      const updatedBody: UpdateUserBody = req.body;

      const updatedInfo: UpdateUserWithProfileImg = {
        updatedProfileImg,
        ...updatedBody,
      };

      const updatedUser = await this.userService.updateUser(id, updatedInfo);

      return res.json({
        status: 201,
        message: "User udate success.",
        data: { updatedUser, reissuedAccessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeUser(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(
        req.authInfo,
      );

      if (id !== userId)
        throw new CustomError(401, "Error: User not identical.");

      await this.userService.removeUser(id);

      return res.json({
        status: 201,
        message: "Delete user success",
      });
    } catch (error) {
      next(error);
    }
  }
}
