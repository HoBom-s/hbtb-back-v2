import { Router } from "express";
import { TagController } from "../controllers/tag.controller";
import authValidateMiddleware from "../middlewares/auth.middleware";
import bodyValidateMiddleware from "../middlewares/body.middleware";

const tagRouter = Router();
const tagController = new TagController();

tagRouter.get("/", tagController.getAllTag.bind(tagController));
tagRouter.post(
  "/create",
  authValidateMiddleware,
  bodyValidateMiddleware(TAG_CREATE),
  tagController.createTag.bind(tagController),
);
tagRouter.patch(
  "/update/:id",
  authValidateMiddleware,
  tagController.updateTag.bind(tagController),
);
tagRouter.delete(
  "/delete/:id",
  authValidateMiddleware,
  tagController.removeTag.bind(tagController),
);

export default tagRouter;
