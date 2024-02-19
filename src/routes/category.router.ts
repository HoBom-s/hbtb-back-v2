import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import authValidateMiddleware from "../middlewares/auth.middleware";
import {
  CATEGORY_CREATE,
  CATEGORY_UPDATE,
  ID_PARAM,
} from "../static/validate.const";
import bodyValidateMiddleware from "../middlewares/body.middleware";
import paramValidateMiddleware from "../middlewares/param.middleware";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get(
  "/",
  categoryController.getAllCategories.bind(categoryController),
);

categoryRouter.post(
  "/",
  authValidateMiddleware,
  bodyValidateMiddleware(CATEGORY_CREATE),
  categoryController.createCategory.bind(categoryController),
);

categoryRouter.patch(
  "/:id",
  authValidateMiddleware,
  paramValidateMiddleware(ID_PARAM),
  bodyValidateMiddleware(CATEGORY_UPDATE),
  categoryController.updateCategory.bind(categoryController),
);

categoryRouter.delete(
  "/:id",
  authValidateMiddleware,
  paramValidateMiddleware(ID_PARAM),
  categoryController.removeCategory.bind(categoryController),
);

export default categoryRouter;
