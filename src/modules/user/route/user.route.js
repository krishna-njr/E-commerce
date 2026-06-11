import { Router } from "express";
import {
  getUserController,
  loginUserController,
  registerUserController,
} from "../controller/user.controller.js";
import {
  authorize,
  authenticateValidation,
} from "../middleware/user.middleware.js";

const router = Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.get("/profile", authenticateValidation, getUserController);

router.get(
  "/admin/profile",
  authenticateValidation,
  authorize("admin"),
  (req, res) => {
    console.log("admin protected route : ", req.body);
  },
);

export { router };
