import { prisma } from "../../../../clients/pg-client.js";
import AppError from "../../../../utils/appError.js";

export const createDelivery = async (data) => {
  try {
    const delivery = await prisma.delivery.create({ data });
    if (!delivery) {
      throw new AppError("Failed to create delivery", 500);
    }
    return delivery;
  } catch (error) {
    console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};

export const getDeliveries = async () => {
  try {
    const deliveries = await prisma.delivery.findMany({
      include: {
        order: true,
      },
      take: 100,
    });
    if (!deliveries) {
      throw new AppError("No deliveries found", 404);
    }
    return deliveries;
  } catch (error) {
    console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};

export const getDeliveryById = async (deliveryId) => {
  try {
    const delivery = await prisma.delivery.findUnique({
      where: { id: deliveryId },
      include: {
        order: true,
      },
    });
    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }
    return delivery;
  } catch (error) {
    console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};

export const updateDelivery = async (deliveryId, data) => {
  try {
    const delivery = await prisma.delivery.update({
      where: { id: deliveryId },
      data,
    });
    if (!delivery) {
      throw new AppError("Failed to update delivery", 500);
    }
    return delivery;
  } catch (error) {
    console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};

export const updateDeliveryStatus = async (deliveryId, status) => {
  try {
    const delivery = await prisma.delivery.update({
      where: { id: deliveryId },
      data: { status },
    });
    if (!delivery) {
      throw new AppError("Failed to update delivery status", 500);
    }
    return delivery;
  } catch (error) {
    console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};
