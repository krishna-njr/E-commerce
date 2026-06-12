import { prisma } from "../../../../clients/pg-client.js";

export const createOrderService = () => {
    try{
        return prima.$transaction(async (tx) => {
            // 1. Create the order
        }); 
    }
};

export const getOrdersService = () => {
  // all the orders of the user :
  try {
    return prisma.order.findMany({
      where: {
        userId: 1,
      },
      include: {
        orderItems: true,
      },
    });
  } catch (error) {
    throw new appError(`Database Error in getOrdersService : ${error.message}`);
  }
};

export const getOrderByIdService = (id) => {
  try {
    return prisma.order.findUnique({
      where: {
        id: id,
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

export const updateOrderStatusService = (id, status) => {
  try {
    return prisma.order.update({
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

export const updatePaymentStatusService = (id, paymentStatus) => {
  try {
    return prisma.order.update({
      where: {
        id: id,
      },
      data: {
        paymentStatus: paymentStatus, // we have to check the field in the prisma schema.
      },
    });
  } catch (error) {
    throw new appError(
      `Database Error in updatePaymentStatusService : ${error.message}`,
    );
  }
};

export const cancelOrderService = (id) => {
  try {
    return prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: "cancelled", // we have to check the field in the prisma schema.
      },
    });
  } catch (error) {
    throw new appError(
      `Database Error in cancelOrderService : ${error.message}`,
    );
  }
};
