import { Request, Response, NextFunction } from "express";
import { TCreateUser } from "../types/user.type";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { nickname, password, profileImg, introduction }: TCreateUser =
        req.body;

      if (!nickname || !password || !introduction) {
        // error handling middleware
        console.error("모든 필수값을 입력해주세요");
        return;
      }

      const createdUser = await this.userService.createUser({
        nickname,
        password,
        profileImg,
        introduction,
      });

      return res.status(201).json({
        status: 201,
        message: "Successfully created user",
        data: createdUser,
      });
    } catch (error) {
      // error handling middleware
      // next(error);
      console.error(error);
    }
  }
}

/*
logoutUserRequest
getUserInformationRequest
loginUserRequest
updateUserRequest
deleteUserRequest

Error handling middleware
*/
