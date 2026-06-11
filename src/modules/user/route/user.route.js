import { Router } from "express";
import {
  getUserController,
  loginUserController,
  registerUserController,
} from "../controller/user.controller.js";
import { authorize, protect } from "../middleware/user.middleware.js";

const router = Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.get("/profile", protect, getUserController);

router.get("/admin/profile", protect, authorize("admin"), (req, res) => {
  console.log("admin protected route : ", req.body);
});

export { router };
