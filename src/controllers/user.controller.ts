import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { CustomError } from "../middlewares/error.middleware";
import { Auth } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";
import validateDto from "../utils/dto.util";
import CreateUserRequestDto from "../dtos/user/createUserRequest.dto";
import sendResponse from "../utils/response.util";
import LoginUserRequestDto from "../dtos/user/loginUserRequest.dto";
import UpdateUserRequestDto from "../dtos/user/updateUserRequest.dto";
import { MulterFile } from "../types/image.type";

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

      return sendResponse(res, 200, "Get user info success.", {
        foundUser,
        reissuedAccessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserRequestDto = await validateDto(
        req.body,
        CreateUserRequestDto,
      );

      const profileImg = req.file as MulterFile;

      if (!createUserRequestDto)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const createdUser = await this.userService.createUser(
        createUserRequestDto,
        profileImg,
      );

      return sendResponse(res, 201, "Create user success.", { createdUser });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const loginUserRequestDto = await validateDto(
        req.body,
        LoginUserRequestDto,
      );

      if (!loginUserRequestDto)
        throw new CustomError(
          400,
          "Error: Request body missing. Please provide the necessary data in the request body.",
        );

      const { accessToken, refreshToken } =
        await this.userService.loginUser(loginUserRequestDto);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14days
      });

      return sendResponse(res, 200, "Login success.", { accessToken });
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

      return sendResponse(res, 201, "Logout success.");
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

      const profileImg = req.file as MulterFile;

      const updateUserRequestDto = await validateDto(
        req.body,
        UpdateUserRequestDto,
      );

      const updatedUser = await this.userService.updateUser(
        id,
        updateUserRequestDto,
        profileImg,
      );

      return sendResponse(res, 201, "User udate success.", {
        updatedUser,
        reissuedAccessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeUser(req: Request & Auth, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { userId } = this.authHelper.validateAuthInfo(req.authInfo);

      if (id !== userId)
        throw new CustomError(401, "Error: User not identical.");

      await this.userService.removeUser(id);

      return sendResponse(res, 201, "Delete user success.");
    } catch (error) {
      next(error);
    }
  }
}
