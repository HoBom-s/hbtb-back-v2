import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/create", userController.createUser);

export default userRouter;
