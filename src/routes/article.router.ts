import { Router } from "express";
import authValidateMiddleware from "../middleware/auth.middleware";
import { ArticleController } from "../controllers/article.controller";

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
articleRouter.patch(
  "/update/:id",
  authValidateMiddleware,
  articleController.updateArticle.bind(articleController),
);
articleRouter.post(
  "/create",
  authValidateMiddleware,
  articleController.createArticle.bind(articleController),
);
articleRouter.delete(
  "/delete/:id",
  authValidateMiddleware,
  articleController.removeArticle.bind(articleController),
);

export default articleRouter;

/*
router.get("/list", articleController.getArticlePerPageRequest);
router.get("/search", articleController.getArticleSearchRequest);
router.delete(
  "/delete/:_id",
  articleController.deleteArticleRequest,
);
*/
