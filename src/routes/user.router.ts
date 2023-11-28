import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRouter {
  userRouter: Router;
  private userController: UserController;

  constructor() {
    this.userRouter = Router();
    this.userController = new UserController();
  }
}

// const userRouter = Router();

// const userController = new UserController();

// userRouter.post("/create", userController.createUser);
