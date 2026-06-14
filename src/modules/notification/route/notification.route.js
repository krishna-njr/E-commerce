import { Router } from "express";
import * as notificationController from "../controller/notfication.controller.js";
import validateRequest from "../../../shared/validateRequest.middleware.js";
import { createNotificationSchema } from "../validations/notification.validation.js";

const router = Router();

router.post(
  "/",
  validateRequest(createNotificationSchema),
  notificationController.createNotificationController,
);

router.get("/", notificationController.getNotificationsController);

router.patch("/:id/read", notificationController.markAsReadController);

router.delete("/:id", notificationController.deleteNotificationController);

export { router };
