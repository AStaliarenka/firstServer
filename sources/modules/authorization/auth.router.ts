import { Router } from "express";
const router = Router();
import authController from "./auth.controller";

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.get("/login", authController.cookieLogin);
// router.get("/users", controller.getUsers);

export default router;
