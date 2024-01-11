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

tagRouter.delete("/delete/:id", authValidateMiddleware, tagController.removeTag.bind(tagController))

export default tagRouter;
/*
router.get("/", tagController.getAllTagRequest);


router.delete(
  "/delete/:_id",
  authValidation,
  paramValidation(STATIC_TAG_DELETE),
  tagController.deleteTagRequest
);
*/
