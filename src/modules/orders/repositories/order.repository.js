import { prisma } from "../../../../clients/pg-client.js";
import AppError from "../../../../utils/AppError.js";

export const createOrder = async ({ userId, items, totalAmount, addressId = 2 }) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // Create the order
      const order = tx.order.create({
        data: {
          userId: userId,
          totalAmount: totalAmount,
          addressId: addressId,
          items: {
            create: items,
          },

          delivery: {
            create: {},
          },

          user: {
            create: {},
          },

          delivery: {
            create: {},
          },

        },


      })

      // add in order_items; 

      // inventory deduction: 


      return order;
    });
  } catch (error) {
    console.log(error.message);
    throw new AppError(`Database Error in createOrderService: ${error.message}`)
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
    console.log(error.message);

    throw new appError(`Database Error in getOrdersService : ${error.message}`);
  }
};

export const getOrderById = async (id) => {
  try {
    return await prisma.order.findUnique({
      where: {
        userId: id,
      },
      include: {
        orderItems: true,
      },
    });
  } catch (error) {
    throw new appError(
      `Database Error in getOrderByIdService : ${error.message}`,
    );
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    return await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  } catch (error) {
    throw new appError(
      `Database Error in updateOrderStatusService : ${error.message}`,
    );
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
    throw new appError(
      `Database Error in updatePaymentStatusService : ${error.message}`,
    );
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
    throw new appError(
      `Database Error in cancelOrderService : ${error.message}`,
    );
  }
};
