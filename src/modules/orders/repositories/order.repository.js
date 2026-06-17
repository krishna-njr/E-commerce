import { prisma } from "../../../../clients/prisma.client.js";
import AppError from "../../../../utils/AppError.js";
import {
  cleanCartWithTx,
  getCartByIdWithTx,
} from "../../cart/repositories/cart.repository.js";
import { createDeliveryWithTx } from "../../delivery/repositories/delivery.repository.js";
import { decreaseInventoryItemsQuantityWithTx } from "../../inventory/repositories/inventory.repository.js";
import { createNotificationWithTx } from "../../notification/repositories/notification.repository.js";

export const createOrder = async ({ userId, addressId }) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // 1. get user cart
      const cart = await getCartByIdWithTx(userId, tx);

      if (!cart || cart.items.length === 0) {
        throw new AppError("Cart is empty", 400);
      }
      // console.log("got user cart with items", cart);

      // 2. validating inventory
      ValidateInventoryItems(cart.items);
      // console.log("validated inventory items");

      // 3. totalAmount
      const totalAmount = calculateTotalAmount(cart.items);
      // console.log("totalAmount", totalAmount);

      // 4. create order
      const order = await createOrderWithTx(userId, totalAmount, addressId, tx);
      // console.log("order", order);

      // 5. add in order items;
      const orderItems = await createOrderItemsWithTx(order.id, cart.items, tx);
      // console.log("orderItems", orderItems);

      // 6. inventory deduction:
      await decreaseInventoryItemsQuantityWithTx(cart.items, tx);
      // console.log("decreased inventory items");

      // 7. clear cart
      const deletedItems = await cleanCartWithTx(cart.id, tx); // clean cart items
      // console.log("deletedItems", deletedItems);

      // 8. create deilvery
      const delivery = await createDeliveryWithTx(order.id, tx);
      // console.log("delivery", delivery);

      // 9 notfication :
      const notfication = await createNotificationWithTx(userId, order.id, tx);
      // console.log("notfication", notfication);

      // 10 return order
      return order;
    });
  } catch (error) {
    // console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`);
  }
};

export const getOrders = async () => {
  try {
    return await prisma.order.findMany({
      include: {
        items: true,
      },
    });
  } catch (error) {
    // console.log(error.message);

    throw new AppError(`Internal Server Error : ${error.message}`);
  }
};

export const getOrderById = async (id) => {
  try {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        delivery: true,
      },
    });
  } catch (error) {
    throw new AppError(`Internal Server Error : ${error.message}`);
  }
};

export const getOrderStatus = async (id) => {
  try{
    const status = await prisma.order.findUnique({
      where: {id}, 
      // select: {
      //   orderStatus: true, 
      //   paymentStatus: true, 
      // }  
    });
    // console.log(`inside getOrderStatus repo : ${status}`); 
    // console.log(JSON.stringify(status)); 
    return status; 
  }catch(error){
    throw new AppError(`Internal Server Error : ${error.message}`); 
  }
}

export const updateOrderStatus = async (id, status) => {
  try {
    return await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        orderStatus: status,
      },
    });
  } catch (error) {
    throw new AppError(`Internal Server Error : ${error.message}`);
  }
};

export const updatePaymentStatus = async (id, paymentStatus) => {
  try {
    return await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        paymentStatus: paymentStatus,
      },
    });
  } catch (error) {
    throw new AppError(`Internal Server Error : ${error.message}`);
  }
};

export const cancelOrder = async (id) => {
  try {
    return await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        orderStatus: "CANCELLED",
      },
    });
  } catch (error) {
    throw new AppError(`Internal Server Error : ${error.message}`);
  }
};

// *********** order-items :
export const createOrderItemsWithTx = async (orderId, items, tx) => {
  try {
    const cartItems = await tx.orderItem.createMany({
      data: items.map((item) => ({
        orderId: orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price * item.quantity,
      })),
    });
    if (!cartItems) throw new appError("order items not created", 500);
    return cartItems;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Interval Server Error : ${error.message}`, 500);
  }
};

// **********************
export const createOrderWithTx = async (userId, totalAmount, addressId, tx) => {
  try {
    const order = await tx.order.create({
      data: {
        userId: userId,
        totalAmount: totalAmount,
        addressId: addressId,
        // orderStatus: "PENDING", // default set
        // paymentStatus: "PENDING"
      },
    });
    if (!order) {
      throw new AppError("Failed to create order", 500);
    }
    return order;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};

// static function :
export const ValidateInventoryItems = (items) => {
  for (const item of items) {
    const stock = item.product.inventory.quantity;
    if (stock < item.quantity) {
      throw new AppError(`${item.product.name} is out of stock`, 500);
    }
  }
};

export const calculateTotalAmount = (items) => {
  const totalAmount = items.reduce((sum, item) => {
    return sum + item.quantity * item.product.price;
  }, 0);

  return totalAmount;
};
