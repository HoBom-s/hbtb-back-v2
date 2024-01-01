import { Router } from "express";
import authValidateMiddleware from "../middleware/auth.middleware";
import { ArticleController } from "../controllers/article.controller";

const articleRouter = Router();
const articleController = new ArticleController();

articleRouter.post(
  "/create",
  authValidateMiddleware,
  articleController.createArticle,
);

export default articleRouter;

/*
router.get("/", articleController.getAllArticleRequest);
router.get("/list", articleController.getArticlePerPageRequest);
router.get("/find/:path", articleController.getArticleFindByPathRequest);
router.get("/search", articleController.getArticleSearchRequest);
router.post(
  "/create",
  authValidation,
  articleController.createArticleRequest,
);
router.patch(
  "/update/:_id",
  articleController.updateArticleRequest,
);
router.delete(
  "/delete/:_id",
  articleController.deleteArticleRequest,
);
*/
