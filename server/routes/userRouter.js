import {Router} from "express";
import * as userController from "../controllers/userController.js"
const router = Router();

router.route("/create-account").post(userController.createAccount);
router.route("/check-mail").post(userController.checkEmail);

export default router;