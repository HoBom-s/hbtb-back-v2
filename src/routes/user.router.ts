import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import {
  ID_PARAM,
  USER_LOGIN,
  USER_CREATE,
  USER_UPDATE,
} from "../static/validate.const";
import authValidateMiddleware from "../middlewares/auth.middleware";
import paramValidateMiddleware from "../middlewares/param.middleware";
import bodyValidateMiddleware from "../middlewares/body.middleware";
import multer from "multer";

const userRouter = Router();

const userController = new UserController();
const upload = multer();

userRouter.get(
  "/",
  authValidateMiddleware,
  userController.getUserInfo.bind(userController),
);

userRouter.post(
  "/signup",
  upload.single("profileImg"),
  bodyValidateMiddleware(USER_CREATE),
  userController.createUser.bind(userController),
);

userRouter.post(
  "/login",
  bodyValidateMiddleware(USER_LOGIN),
  userController.loginUser.bind(userController),
);

userRouter.get(
  "/logout",
  authValidateMiddleware,
  userController.logoutUser.bind(userController),
);

userRouter.patch(
  "/:id",
  authValidateMiddleware,
  paramValidateMiddleware(ID_PARAM),
  upload.single("profileImg"),
  bodyValidateMiddleware(USER_UPDATE),
  userController.updateUser.bind(userController),
);

userRouter.delete(
  "/:id",
  authValidateMiddleware,
  paramValidateMiddleware(ID_PARAM),
  userController.removeUser.bind(userController),
);

export default userRouter;
