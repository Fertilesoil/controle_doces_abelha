import { Router } from "express";
import LoginController from "../Controllers/LoginController.mjs";
import { authMiddleware } from "../Middlewares/Auth/AuthMiddleware.mjs";

const router = new Router();

router.post("/api/login", LoginController.login);
router.post("/api/refresh", LoginController.refresh);
router.post("/api/logout", LoginController.logout);
router.get("/api/autenticacao", authMiddleware, LoginController.checarToken);

export default router;