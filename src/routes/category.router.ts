import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import authValidateMiddleware from "../middlewares/auth.middleware";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get(
  "/",
  categoryController.getAllCategories.bind(categoryController),
);

categoryRouter.post(
  "/create",
  authValidateMiddleware,
  categoryController.createCategory.bind(categoryController),
);

categoryRouter.patch(
  "/update/:id",
  authValidateMiddleware,
  categoryController.updateCategory.bind(categoryController),
);

categoryRouter.delete(
  "delete/:id",
  authValidateMiddleware,
  categoryController.removeCategory.bind(categoryController),
);

export default categoryRouter;
