import { prisma } from "../../../../clients/prisma.client.js";
import AppError from "../../../../utils/AppError.js";

export const createNotification = async (notificationData) => {
  try {
    const notification = await prisma.notification.create({
      data: notificationData,
    });
    if (!notification) {
      throw new AppError("Failed to create notification", 400);
    }
    return notification;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error creating notification", 500);
  }
};

export const getNotifications = async (userId) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    if (!notifications) {
      throw new AppError("No notifications found", 404);
    }
    return notifications;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error fetching notifications", 500);
  }
};

export const getNotificationById = async (id) => {
  try {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });
    if (!notification) {
      throw new AppError("Notification not found", 404);
    }
    return notification;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error fetching notification", 500);
  }
};

export const markAsRead = async (id) => {
  try {
    const notification = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
    if (!notification) {
      throw new AppError("Notification not found", 404);
    }
    return notification;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error marking notification as read", 500);
  }
};

export const deleteNotification = async (id) => {
  try {
    const notification = await prisma.notification.delete({
      where: { id },
    });
    if (!notification) {
      throw new AppError("Notification not found", 404);
    }
    return notification;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error deleting notification", 500);
  }
};

// ************************
export const createNotificationWithTx = async (userId, orderId, tx) => {
  try {
    const notification = await tx.notification.create({
      data: {
        userId,
        title: "Order Created",
        message: `Order #${orderId} has been placed successfully`,
      },
    });
    if (!notification) {
      throw new AppError("Failed to create notification", 400);
    }
    return notification;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Interval Server Error : ${error.message}`, 500);
  }
};
