import { prisma } from "../../../../clients/pg-client.js";
import AppError from "../../../../utils/appError.js";

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

export const getNotifications = async () => {};

export const markAsRead = async () => {};

export const deleteNotification = async () => {};

// ***********************

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
