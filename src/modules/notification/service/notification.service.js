import * as notificationRepository from "../repositories/notification.repository.js";
import AppError from "../../../../utils/appError.js";

export const createNotificationService = async (notificationData) => {
  try {
    const notification =
      await notificationRepository.createNotification(notificationData);
    return notification;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error creating notification", 500);
  }
};

export const getNotificationsService = async (userId) => {
  try {
    const notifications = await notificationRepository.getNotifications(userId);
    return notifications;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error fetching notifications", 500);
  }
};

export const getNotificationByIdService = async (notificationId) => {
  try {
    const notification =
      await notificationRepository.getNotificationById(notificationId);
    return notification;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error fetching notification", 500);
  }
};

export const markAsReadService = async (notificationId) => {
  try {
    const notification =
      await notificationRepository.markAsRead(notificationId);
    return notification;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error marking notification as read", 500);
  }
};

export const deleteNotificationService = async (notificationId) => {
  try {
    const notification =
      await notificationRepository.deleteNotification(notificationId);
    return notification;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error deleting notification", 500);
  }
};
