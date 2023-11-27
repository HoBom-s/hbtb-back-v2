import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { createUserDto } from "./dtos/createUser.dto";

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        nickname,
        password,
        profileImg,
        role,
        introduction,
      }: createUserDto = req.body;

      if (!nickname || !password || !role || !introduction) {
        // error handling middleware
        console.error("모든 필수값을 입력해주세요");
      }
    } catch (error) {
      next(error);
    }
  }
}
