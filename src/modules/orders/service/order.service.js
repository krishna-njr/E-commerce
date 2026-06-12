import { cancelOrder, createOrder, getOrderById, getOrders, updateOrderStatus, updatePaymentStatus } from "../repositories/order.repository.js";
import AppError from '../../../../utils/AppError.js';

export const createOrderService = async ({ userId, items }) => {
  try {
    const order = await createOrder();
  } catch (error) {
    throw new AppError(`Order is not Created, ${error.message}`, 500)
  }
};

export const getOrdersService = async () => {
  try {
    const orders = await getOrders();
    if (orders.length < 1) {
      throw new AppError(`Not Found`, 400);
    }

    return orders;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to get orders details ${error.message}`, 500);
  }

};

export const getOrderByIdService = (productId) => {
  try {
    if (!productId) {
      throw new AppError('Missing Id', 400)
    }
    const order = await getOrderById(productId);

    return order;
  } catch (error) {
    if (error instanceof AppError) throw error
    throw new AppError(`Failed to get order by id, ${error.message}`, 500);
  }
};

export const updateOrderStatusService = (productId, status) => {
  try {
    if (!productId) {
      throw new AppError('Missing Id', 400);
    }
    const updatedOrder = await updateOrderStatus(productId, status);

    return updatedOrder;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to update order staus ${error.message}`, 500);
  }
};

export const updatePaymentStatusService = (productId, paymentStatus) => {
  try {
    if (!productId) {
      throw new AppError('Missing Id', 400);
    }
    const updatedOrder = await updatePaymentStatus(productId, paymentStatus);

    return updatedOrder;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to update order staus ${error.message}`, 500);
  }
};

export const cancelOrderService = (productId) => {
  try {
    if (!productId) {
      throw new AppError('Missing Id', 400);
    }
    const cancelledOrder = await cancelOrder(productId);

    return cancelledOrder;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to update order staus ${error.message}`, 500);
  }
};
