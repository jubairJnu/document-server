import { Router } from "express";
import { articleController } from "./article.controller";

const router = Router();

router.get("/", articleController.getUserArticle);
router.get("/", articleController.creaArticles);
router.get("/:id", articleController.summaryArticle);
router.delete("/:id", articleController.deleteArticles);

export const articleRoutes = router;
