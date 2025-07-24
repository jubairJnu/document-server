import { Router } from "express";
import { articleController } from "./article.controller";
import auth from "../../middlewares/auth.mliddleware";

const router = Router();

router.get("/", auth(), articleController.getUserArticle);
router.post("/", auth(), articleController.creaArticles);
router.get("/:id", auth(), articleController.getUserSingleArticles);
router.post("/:id", auth(), articleController.summaryArticle);
router.delete("/:id", articleController.deleteArticles);

export const articleRoutes = router;
