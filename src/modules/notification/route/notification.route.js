import { Router } from "express";
import * as notificationController from "../controller/notfication.controller.js";
import validateRequest from "../../../shared/validateRequest.middleware.js";
import {
  createNotificationSchema,
  deleteNotificationSchema,
  getNotificationsSchema,
  markAsReadSchema,
} from "../validations/notification.validation.js";
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

router.get(
  "/",
  validateRequest(getNotificationsSchema),
  notificationController.getNotificationsController,
);

router.patch(
  "/read/:id",
  validateRequest(markAsReadSchema),
  notificationController.markAsReadController,
);

router.delete(
  "/:id",
  validateRequest(deleteNotificationSchema),
  notificationController.deleteNotificationController,
);

export { router };
