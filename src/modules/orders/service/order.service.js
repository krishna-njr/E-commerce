import {
  cancelOrder,
  createOrder,
  getOrderById,
  getOrders,
  getOrderStatus,
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
    // ! use transaction state : 
    const { orderStatus } = await getOrderStatus(orderId); ;  

      if(orderStatus === 'CANCELLED' || orderStatus === 'DELIVERED'){
         throw new AppError(`Status Not valid`, 400); 
      }
      if(orderStatus === 'PENDING'){
        if(status === 'DELIVERED' || status === 'SHIPPED'){
          throw new AppError('Status Not valid', 400); 
        }
      }
      if(orderStatus === 'CONFIRMED'){
       if(status === 'PENDING' || status === 'DELIVERED'){
         throw new AppError('Status Not valid', 400); 
       }
      }
      if(orderStatus === 'SHIPPED'){
        if(status === 'PENDING' || status === 'CONFIRMED'){
          throw new AppError('Status Not valid', 400); 
        }
      }

    const updatedOrder = await updateOrderStatus(orderId, status);

    if(!updatedOrder){
      throw new AppError(`Order Not Found`, 404); 
    }

    return updatedOrder;
  }catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to update order status ${error.message}`, 500);
  }
};

export const updatePaymentStatusService = async (orderId, status) => {
  try {

    // we have to check the status is not 'failed' or 'paid' or 'refunded'
    const {paymentStatus} = await getOrderStatus(orderId); 
    
    /*
      pending
      paid
      failed 
      refunded
    */
    // console.log(`updatepaymentstatusservice : ${paymentStatus}, ${status}`);
    
    // let paymentStatus; 
    if(paymentStatus === 'FAILED'){
      if(status === 'PENDING' || status === 'PAID'){
        throw new AppError('Status Not Valid', 400); 
      }
    } 
    if(paymentStatus === 'PENDING'){
      if(status === 'REFUNDED'){
        throw new AppError('Status Not Valid', 400); 
      }
    }
    if(paymentStatus === 'PAID'){
      if(status === 'PENDING'){
        throw new AppError('Status Not Valid', 400); 
      }
    }
    if(paymentStatus === 'REFUNDED'){
      if(status !== 'REFUNDED'){
        throw new AppError('Status Not Valid', 400); 
      }
    }
      
      if( paymentStatus === 'PAID' || paymentStatus === 'REFUNDED'){
      throw new AppError('Payment status not valid', 400); 
    }
    
    const updatedOrder = await updatePaymentStatus(orderId, status);
    
    if(!updatedOrder){
      throw new AppError('Order Not Found', 404); 
    }

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
