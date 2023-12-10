import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import authValidateMiddleware from "../middleware/auth.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/me", authValidateMiddleware, userController.getUserInfo);
userRouter.post("/create", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", authValidateMiddleware, userController.logoutUser);
userRouter.patch(
  "/update/:id",
  authValidateMiddleware,
  userController.updateUser
);
userRouter.delete(
  "/delete/:id",
  authValidateMiddleware,
  userController.deleteUser
);

export default userRouter;
