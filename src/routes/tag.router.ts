import { Router } from "express";
import { TagController } from "../controllers/tag.controller";

const tagRouter = Router();
const tagController = new TagController();

tagRouter.post("/create", tagController.createTag.bind(tagController));

export default tagRouter;
