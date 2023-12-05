import { Request, Response, NextFunction } from "express";
import { TCreateUser, TLoginUser } from "../types/user.type";
import { UserService } from "../services/user.service";
import { CustomError } from "../middleware/error.middleware";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { nickname, password, profileImg, introduction }: TCreateUser =
        req.body;

      if (!nickname || !password || !introduction)
        throw new CustomError(400, "모든 필수값을 입력해주세요.");

      const createdUser = await this.userService.createUser({
        nickname,
        password,
        profileImg,
        introduction,
      });

      return res.status(201).json({
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
        throw new CustomError(400, "아이디와 비밀번호를 입력해주세요.");

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
}

/*
( ) logoutUserRequest
( ) getUserInformationRequest
( ) updateUserRequest
( ) deleteUserRequest
*/
