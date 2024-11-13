import { Router } from "express";
import usersController from "./users.controller";
import roleMiddleware from "../../middleware/roleMiddleware";
import constants from "../../constants";

const router = Router();

router.get("", usersController.getUserInfo);
router.get("/users", roleMiddleware([constants.DB.USERS.ROLES.ADMIN]), usersController.getAllUsers);
router.put("/newUser", roleMiddleware([constants.DB.USERS.ROLES.ADMIN]), usersController.addNewUser);
router.patch("", usersController.updateUserInfo);

export default router;