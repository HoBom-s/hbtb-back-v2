import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import authValidateMiddleware from "../middlewares/auth.middleware";
import {
  ID_PARAM,
  USER_CREATE,
  USER_LOGIN,
  USER_UPDATE,
} from "../static/validate.const";
import bodyValidateMiddleware from "../middlewares/body.middleware";
import paramValidateMiddleware from "../middlewares/param.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/me",
  authValidateMiddleware,
  userController.getUserInfo.bind(userController),
);
userRouter.post(
  "/signup",
  // bodyValidateMiddleware(USER_CREATE),
  userController.createUser.bind(userController),
);
userRouter.post(
  "/login",
  // bodyValidateMiddleware(USER_LOGIN),
  userController.loginUser.bind(userController),
);
userRouter.post(
  "/logout",
  authValidateMiddleware,
  userController.logoutUser.bind(userController),
);
userRouter.patch(
  "/update/:id",
  authValidateMiddleware,
  // paramValidateMiddleware(ID_PARAM),
  // bodyValidateMiddleware(USER_UPDATE),
  userController.updateUser.bind(userController),
);
userRouter.delete(
  "/delete/:id",
  authValidateMiddleware,
  // paramValidateMiddleware(ID_PARAM),
  userController.deleteUser.bind(userController),
);

export default userRouter;
