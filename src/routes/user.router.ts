import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import authValidateMiddleware from "../middleware/auth.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/me",
  authValidateMiddleware,
  userController.getUserInfo.bind(UserController) // WIP
);
userRouter.post("/create", userController.createUser.bind(UserController));
userRouter.post("/login", userController.loginUser.bind(UserController));
userRouter.post(
  "/logout",
  authValidateMiddleware,
  userController.logoutUser.bind(UserController)
);
userRouter.patch(
  "/update/:id",
  authValidateMiddleware,
  userController.updateUser.bind(UserController)
);
userRouter.delete(
  "/delete/:id",
  authValidateMiddleware,
  userController.deleteUser.bind(UserController)
);

export default userRouter;
