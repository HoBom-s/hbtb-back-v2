import { Request, Response, NextFunction } from "express";
import { TCreateUser, TLoginUser, TUpdateUser } from "../types/user.type";
import { UserService } from "../services/user.service";
import { CustomError } from "../middlewares/error.middleware";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserInfo(
    req: Request & { userId?: string },
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.userId;
      if (!userId) throw new CustomError(401, "Please check the UserID.");
      const foundUser = await this.userService.findOneUserById(userId);

      return res.json({
        status: 200,
        message: "Get user info success.",
        data: foundUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUserInfo: TCreateUser = req.body;

      if (!newUserInfo) throw new CustomError(400, "Missing req.body.");

      const createdUser = await this.userService.createUser(newUserInfo);

      return res.json({
        status: 201,
        message: "Create user success.",
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const loginInfo: TLoginUser = req.body;

      if (!loginInfo)
        throw new CustomError(400, "Please check login nickname and password.");

      const { accessToken, refreshToken } =
        await this.userService.loginUser(loginInfo);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14days in milliseconds
      });

      return res.json({
        status: 200,
        message: "Login success.",
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(
    req: Request & { userId?: string },
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.userId;
      if (!userId) throw new CustomError(400, "Please check the UserID.");
      await this.userService.logoutUser(userId);
      res.clearCookie("refreshToken");

      return res.json({
        status: 201,
        message: "Logout success.",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request & { userId?: string },
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      if (id !== userId) throw new CustomError(400, "User not identical.");
      const updates: TUpdateUser = req.body;
      const updatedUser = await this.userService.updateUser(id, updates);

      return res.json({
        status: 201,
        message: "User udate success.",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request & { userId?: string },
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      if (id !== userId) throw new CustomError(400, "User not identical.");
      await this.userService.deleteUser(id);
      return res.json({
        status: 201,
        message: "Delete user success",
      });
    } catch (error) {
      next(error);
    }
  }
}
