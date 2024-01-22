import { Router } from "express";
import { TagController } from "../controllers/tag.controller";
import authValidateMiddleware from "../middlewares/auth.middleware";
import { TAG_CREATE, ID_PARAM, TAG_UPDATE } from "../static/validate.const";
import bodyValidateMiddleware from "../middlewares/body.middleware";
import paramValidateMiddleware from "../middlewares/param.middleware";

const tagRouter = Router();
const tagController = new TagController();

tagRouter.get("/", tagController.getAllTag.bind(tagController));
tagRouter.post(
  "/create",
  authValidateMiddleware,
  // bodyValidateMiddleware(TAG_CREATE),
  tagController.createTag.bind(tagController),
);
tagRouter.patch(
  "/update/:id",
  authValidateMiddleware,
  // paramValidateMiddleware(ID_PARAM),
  // bodyValidateMiddleware(TAG_UPDATE),
  tagController.updateTag.bind(tagController),
);
tagRouter.delete(
  "/delete/:id",
  authValidateMiddleware,
  // paramValidateMiddleware(ID_PARAM),
  tagController.removeTag.bind(tagController),
);

export default tagRouter;
