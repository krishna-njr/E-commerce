import { Router } from "express";
import {
  getUserController,
  loginUserController,
  logoutController,
  refreshTokenController,
  registerUserController,
} from "../controller/user.controller.js";
import {
  authorize,
  validateAuthentication,
  validateRequest,
} from "../middleware/user.middleware.js";
import {
  loginUserSchema,
  logoutSchema,
  refreshTokenSchema,
  registerUserSchema,
} from "../validations/user.validation.js";

const router = Router();

router.post(
  "/register",
  validateRequest(registerUserSchema),
  registerUserController,
);

router.post("/login", validateRequest(loginUserSchema), loginUserController);

router.post(
  "/refresh",
  validateAuthentication,
  validateRequest(refreshTokenSchema),
  refreshTokenController,
);

router.post(
  "/logout",
  validateAuthentication,
  validateRequest(logoutSchema),
  logoutController,
);

router.get("/profile", validateAuthentication, getUserController);

export { router };
