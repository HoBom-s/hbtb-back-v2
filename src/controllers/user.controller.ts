import { Request, Response, NextFunction } from "express";
import { TCreateUser } from "../types/user";
import userService from "../services/user.service";

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { nickname, password, profileImg, introduction }: TCreateUser =
        req.body;

      if (!nickname || !password || !introduction) {
        // error handling middleware
        console.error("모든 필수값을 입력해주세요");
      }

      const createdUser = await userService.createUser({
        nickname,
        password,
        profileImg,
        introduction,
      });

      res.status(201).json({
        status: 201,
        message: "Successfully created user",
        data: createdUser,
      });
    } catch (error) {
      // error handling middleware
      next(error);
    }
  }
}

const userController = new UserController();

export default userController;

/*
logoutUserRequest
getUserInformationRequest
loginUserRequest
updateUserRequest
deleteUserRequest

Error handling middleware
*/
