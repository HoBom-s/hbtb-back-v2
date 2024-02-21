import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import {
  ID_PARAM,
  CATEGORY_CREATE,
  CATEGORY_UPDATE,
} from "../static/validate.const";
import authValidateMiddleware from "../middlewares/auth.middleware";
import paramValidateMiddleware from "../middlewares/param.middleware";
import bodyValidateMiddleware from "../middlewares/body.middleware";

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
