import {
  cancelOrder,
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../repositories/order.repository.js";
import AppError from "../../../../utils/AppError.js";

export const createOrderService = async (orderDetails) => {
  try {
    const order = await createOrder(orderDetails);
  } catch (error) {
    throw new AppError(`Order is not Created, ${error.message}`, 500);
  }
};

export const getOrdersService = async () => {
  try {
    const orders = await getOrders();
    if (orders.length < 1) {
      throw new AppError(`Order Not Found`, 404);
    }

    return orders;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to get orders details ${error.message}`, 500);
  }
};

export const getOrderByIdService = async (userId) => {
  try {
    if (!userId) {
      throw new AppError("Missing Id", 400);
    }
    const order = await getOrderById(userId);

    return order;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to get order by id, ${error.message}`, 500);
  }
};

export const updateOrderStatusService = async (orderId, status) => {
  try {
    if (!orderId) {
      throw new AppError("Missing Id", 400);
    }
    const updatedOrder = await updateOrderStatus(orderId, status);

    return updatedOrder;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to update order status ${error.message}`, 500);
  }
};

export const updatePaymentStatusService = async (orderId, paymentStatus) => {
  try {
    if (!orderId) {
      throw new AppError("Missing Id", 400);
    }
    const updatedOrder = await updatePaymentStatus(orderId, paymentStatus);

    return updatedOrder;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to update order staus ${error.message}`, 500);
  }
};

export const cancelOrderService = async (orderId) => {
  try {
    if (!orderId) {
      throw new AppError("Missing Id", 400);
    }
    const cancelledOrder = await cancelOrder(orderId);

    return cancelledOrder;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to update order status ${error.message}`, 500);
  }
};
