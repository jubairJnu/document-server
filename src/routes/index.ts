import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router();

const modulesRoutes = [
  {
    path: "/auth",
    routes: authRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
