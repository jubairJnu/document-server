import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { articleRoutes } from "../modules/articles/article.routes";

const router = Router();

const modulesRoutes = [
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/articles",
    routes: articleRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
