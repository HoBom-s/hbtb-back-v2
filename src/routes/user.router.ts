import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import authValidateMiddleware from "../middleware/auth.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/create", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", authValidateMiddleware, userController.logoutUser);

export default userRouter;
