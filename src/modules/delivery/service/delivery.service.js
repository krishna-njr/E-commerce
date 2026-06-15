import * as deliveryRepository from "../repositories/delivery.repository.js";
import AppError from "../../../../utils/appError.js";

export const createDeliveryService = async (deliveryData) => {
  try {
    const delivery = await deliveryRepository.createDelivery(deliveryData);
    return delivery;
  } catch (error) {
    throw new AppError(`Failed to create delivery: ${error.message}`, 500);
  }
};

export const getDeliveriesService = async () => {
  try {
    const deliveries = await deliveryRepository.getDeliveries(); // 100
    return deliveries;
  } catch (error) {
    throw new AppError(`Failed to fetch deliveries: ${error.message}`, 500);
  }
};

export const getDeliveryByIdService = async (deliveryId) => {
  try {
    const delivery = await deliveryRepository.getDeliveryById(deliveryId);
    return delivery;
  } catch (error) {
    throw new AppError(`Failed to fetch delivery: ${error.message}`, 500);
  }
};

export const updateDeliveryService = async (deliveryId, deliveryData) => {
  try {
    const delivery = await deliveryRepository.updateDelivery(
      deliveryId,
      deliveryData,
    );
    return delivery;
  } catch (error) {
    throw new AppError(`Failed to update delivery: ${error.message}`, 500);
  }
};

export const updateDeliveryStatusService = async (deliveryId, status) => {
  try {
    const delivery = await deliveryRepository.updateDeliveryStatus(
      deliveryId,
      status,
    );
    return delivery;
  } catch (error) {
    throw new AppError(
      `Failed to update delivery status: ${error.message}`,
      500,
    );
  }
};
