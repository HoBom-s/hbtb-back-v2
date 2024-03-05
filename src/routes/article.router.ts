import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import {
  ID_PARAM,
  PATH_PARAM,
  ARTICLE_CREATE,
  ARTICLE_UPDATE,
} from "../static/validate.const";
import authValidateMiddleware from "../middlewares/auth.middleware";
import paramValidateMiddleware from "../middlewares/param.middleware";
import bodyValidateMiddleware from "../middlewares/body.middleware";
import multer from "multer";
import { createArticleFields } from "../types/image.type";

const upload = multer();

const articleRouter = Router();
const articleController = new ArticleController();

articleRouter.get(
  "/",
  articleController.getAllArticles.bind(articleController),
);

articleRouter.get(
  "/:path",
  paramValidateMiddleware(PATH_PARAM),
  articleController.getArticleFindByPath.bind(articleController),
);

articleRouter.get(
  "/search",
  articleController.searchArticle.bind(articleController),
);

articleRouter.get(
  "/list",
  articleController.getArticlePerPage.bind(articleController),
);

// WIP : merge image upload router
articleRouter.post(
  "/",
  authValidateMiddleware,
  // bodyValidateMiddleware(ARTICLE_CREATE),
  upload.fields(createArticleFields),
  articleController.createArticle.bind(articleController),
);

articleRouter.patch(
  "/:id",
  authValidateMiddleware,
  paramValidateMiddleware(ID_PARAM),
  bodyValidateMiddleware(ARTICLE_UPDATE),
  articleController.updateArticle.bind(articleController),
);

articleRouter.delete(
  "/:id",
  authValidateMiddleware,
  paramValidateMiddleware(ID_PARAM),
  articleController.removeArticle.bind(articleController),
);

export default articleRouter;
