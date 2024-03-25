import { Router } from "express";
import LoginController from "../Controllers/LoginController.mjs";
import { authMiddleware } from "../Middlewares/Auth/AuthMiddleware.mjs";

const router = new Router();

router.post("/api/login", LoginController.login);
router.get("/api/getoso", authMiddleware, LoginController.checarToken);

export default router;