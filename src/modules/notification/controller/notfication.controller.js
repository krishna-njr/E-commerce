import * as notificationService from "../service/notification.service.js";
import AppError from "../../../../utils/appError.js";
import successResponse from "../../../../utils/responseHelper.js";

export const createNotificationController = async (req, res) => {
  const userId = req.user.id;
  const { topic, message } = req.body;

  const notification = await notificationService.createNotificationService({
    userId,
    topic,
    message,
  });

  successResponse(res, notification, "Notification created successfully", 201);
};

export const getNotificationsController = async (req, res) => {
  const userId = req.user.id;

  const notifications =
    await notificationService.getNotificationsService(userId);
  successResponse(
    res,
    notifications,
    "Notifications fetched successfully",
    200,
  );
};

export const markAsReadController = async (req, res) => {
  const notificationId = req.params.id;
  const notification =
    await notificationService.markAsReadService(notificationId);
  successResponse(res, notification, "Notification marked as read", 200);
};

export const deleteNotificationController = async (req, res) => {
  const notificationId = req.params.id;
  const notification =
    await notificationService.deleteNotificationService(notificationId);
  successResponse(res, notification, "Notification deleted successfully", 200);
};
