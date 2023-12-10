import { Request, Response, NextFunction } from "express";
import { TCreateUser, TLoginUser } from "../types/user.type";
import { UserService } from "../services/user.service";
import { CustomError } from "../middleware/error.middleware";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserInfo(
    req: Request & { userId?: string },
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.userId;
      if (!userId) throw new CustomError(400, "Please check the UserID.");
      const foundUser = await this.userService.findOneUserById(userId);

      return res.json({
        status: 200,
        message: "Successfully get the user information.",
        data: foundUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { nickname, password, profileImg, introduction }: TCreateUser =
        req.body;

      if (!nickname || !password || !introduction)
        throw new CustomError(400, "Please insert all required inputs.");

      const createdUser = await this.userService.createUser({
        nickname,
        password,
        profileImg,
        introduction,
      });

      return res.json({
        status: 201,
        message: "Successfully created user.",
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { nickname, password }: TLoginUser = req.body;

      if (!nickname || !password)
        throw new CustomError(400, "Please check nickname and password.");

      const { accessToken, refreshToken } = await this.userService.loginUser(
        nickname,
        password
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3days in milliseconds
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
    next: NextFunction
  ) {
    const userId = req.userId;
    if (!userId) throw new CustomError(400, "Please check the UserID.");
    await this.userService.logoutUser(userId);
    res.clearCookie("refreshToken");

    return res.json({
      status: 201,
      message: "Logout success.",
    });
  }
}

/*

() updateUserRequest
() deleteUserRequest
*/
