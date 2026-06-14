import { Router } from "express";
import * as notificationController from "../controller/notfication.controller.js";
import validateRequest from "../../../shared/validateRequest.middleware.js";
import { createNotificationSchema } from "../validations/notification.validation.js";
import {
  authorize,
  validateAuthentication,
} from "../../user/middleware/user.middleware.js";

const router = Router();

router.use(validateAuthentication, authorize("ADMIN", "CUSTOMER"));

router.post(
  "/",
  validateRequest(createNotificationSchema),
  notificationController.createNotificationController,
);

router.get("/", notificationController.getNotificationsController);

router.patch("/read/:id", notificationController.markAsReadController);

router.delete("/:id", notificationController.deleteNotificationController);

export { router };
