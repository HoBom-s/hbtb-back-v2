import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import authValidateMiddleware from "../middleware/auth.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/me",
  authValidateMiddleware,
  userController.getUserInfo.bind(userController)
);
userRouter.post("/create", userController.createUser.bind(userController));
userRouter.post("/login", userController.loginUser.bind(userController));
userRouter.post(
  "/logout",
  authValidateMiddleware,
  userController.logoutUser.bind(userController)
);
userRouter.patch(
  "/update/:id",
  authValidateMiddleware,
  userController.updateUser.bind(userController)
);
userRouter.delete(
  "/delete/:id",
  authValidateMiddleware,
  userController.deleteUser.bind(userController)
);

export default userRouter;
