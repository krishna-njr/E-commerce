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
    if(!order){
      throw new AppError('Failed to create Order', 400); 
    }
    return order;
  } catch (error) {
    if(error instanceof AppError) throw error;
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

export const getOrderByIdService = async (orderId) => {
  try {
    const order = await getOrderById(orderId);
    if (!order) {
      throw new AppError("Order Not Found", 404);
    }
    return order;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to get order by id, ${error.message}`, 500);
  }
};

export const updateOrderStatusService = async (orderId, status) => {
  try {
    
    /*
    pending, 
    cancelled, 
    confirmed, 
    shippped, 
    delivered, 
  */

    //  * here we have to check what status is allowed to update or not.
    // if(status === 'CANCELLED' || status === 'DELIVERED'){
    //    throw new AppError(`Status not valid`, 400); 
    // }
    const updatedOrder = await updateOrderStatus(orderId, status);

    return updatedOrder;
  }catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to update order status ${error.message}`, 500);
  }
};

export const updatePaymentStatusService = async (orderId, paymentStatus) => {
  try {

    /*
      pending,
      paid, 
      failed,
      refunded
    */
    // if(paymentStatus === 'FAILED' || paymentStatus === 'PAID' || paymentStatus === 'REFUNDED'){
    //   throw new AppError('Payment status not valid', 400); 
    // }
    const updatedOrder = await updatePaymentStatus(orderId, paymentStatus);

    return updatedOrder;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to update order staus ${error.message}`, 500);
  }
};

export const cancelOrderService = async (orderId) => {
  try {
    const cancelledOrder = await cancelOrder(orderId);
    if (!cancelledOrder) {
      throw new AppError("Order Not Found", 404);
    }
    return cancelledOrder;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to update order status ${error.message}`, 500);
  }
};
