import { Router } from "express";
import { articleController } from "./article.controller";

const router = Router();

router.get("/", articleController.getUserArticle);
router.post("/", articleController.creaArticles);
router.post("/:id", articleController.summaryArticle);
router.delete("/:id", articleController.deleteArticles);

export const articleRoutes = router;
