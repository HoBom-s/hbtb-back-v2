import { Router } from "express";
import { TagController } from "../controllers/tag.controller";
import { ID_PARAM, TAG_CREATE, TAG_UPDATE } from "../static/validate.const";
import authValidateMiddleware from "../middlewares/auth.middleware";
import paramValidateMiddleware from "../middlewares/param.middleware";
import bodyValidateMiddleware from "../middlewares/body.middleware";

const tagRouter = Router();
const tagController = new TagController();

tagRouter.get("/", tagController.getAllTags.bind(tagController));

tagRouter.post(
  "/",
  authValidateMiddleware,
  bodyValidateMiddleware(TAG_CREATE),
  tagController.createTag.bind(tagController),
);

tagRouter.patch(
  "/:id",
  authValidateMiddleware,
  paramValidateMiddleware(ID_PARAM),
  bodyValidateMiddleware(TAG_UPDATE),
  tagController.updateTag.bind(tagController),
);

tagRouter.delete(
  "/:id",
  authValidateMiddleware,
  paramValidateMiddleware(ID_PARAM),
  tagController.removeTag.bind(tagController),
);

export default tagRouter;
