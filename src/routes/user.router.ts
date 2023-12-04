import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/create", userController.createUser);
userRouter.get("/login", userController.loginUser);

export default userRouter;
