import { Request, Response, NextFunction } from "express";
import { CreateUser, LoginUser, UpdateUser } from "../types/user.type";
import { UserService } from "../services/user.service";
import { CustomError } from "../middlewares/error.middleware";
import { Auth } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";

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
      const newUserInfo: CreateUser = req.body;

      if (!newUserInfo)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const createdUser = await this.userService.createUser(newUserInfo);

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
      res.clearCookie("refreshToken");

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

      const updates: UpdateUser = req.body;
      const updatedUser = await this.userService.updateUser(id, updates);

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
