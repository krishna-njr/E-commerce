import { Router } from "express";
import {
  getUserController,
  loginUserController,
  registerUserController,
} from "../controller/user.controller.js";
import {
  authorize,
  validateAuthentication,
  validateRequest,
} from "../middleware/user.middleware.js";
import {
  getUserSchema,
  loginUserSchema,
  registerUserSchema,
} from "../validations/user.validation.js";

const router = Router();

router.post(
  "/register",
  validateRequest(registerUserSchema),
  registerUserController,
);

router.post("/login", validateRequest(loginUserSchema), loginUserController);

router.get(
  "/profile",
  validateRequest(getUserSchema),
  validateAuthentication,
  getUserController,
);

router.get(
  "/admin/profile",
  validateRequest(getUserSchema),
  validateAuthentication,
  authorize("ADMIN"),
  (req, res) => {
    console.log("admin protected route : ", req.body);
  },
);

export { router };
