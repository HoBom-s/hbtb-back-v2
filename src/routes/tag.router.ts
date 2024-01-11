import { Router } from "express";
import { TagController } from "../controllers/tag.controller";
import authValidateMiddleware from "../middleware/auth.middleware";

const tagRouter = Router();
const tagController = new TagController();

tagRouter.post(
  "/create",
  authValidateMiddleware,
  tagController.createTag.bind(tagController),
);
tagRouter.patch(
  "/update/:id",
  authValidateMiddleware,
  tagController.updateTag.bind(tagController),
);

export default tagRouter;
