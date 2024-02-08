import { Router } from "express";
import authValidateMiddleware from "../middlewares/auth.middleware";
import { ArticleController } from "../controllers/article.controller";
import {
  ARTICLE_CREATE,
  ARTICLE_UPDATE,
  ID_PARAM,
} from "../static/validate.const";
import bodyValidateMiddleware from "../middlewares/body.middleware";
import paramValidateMiddleware from "../middlewares/param.middleware";

const articleRouter = Router();
const articleController = new ArticleController();

articleRouter.get(
  "/",
  articleController.getAllArticles.bind(articleController),
);

articleRouter.get(
  "/find/:path",
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

articleRouter.post(
  "/create",
  authValidateMiddleware,
  bodyValidateMiddleware(ARTICLE_CREATE),
  articleController.createArticle.bind(articleController),
);

articleRouter.patch(
  "/update/:id",
  authValidateMiddleware,
  // paramValidateMiddleware(ID_PARAM),
  // bodyValidateMiddleware(ARTICLE_UPDATE),
  articleController.updateArticle.bind(articleController),
);

articleRouter.delete(
  "/delete/:id",
  authValidateMiddleware,
  // paramValidateMiddleware(ID_PARAM),
  articleController.removeArticle.bind(articleController),
);

export default articleRouter;
