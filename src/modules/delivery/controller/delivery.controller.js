import * as deliveryService from "../service/delivery.service.js";
import AppError from "../../../../utils/appError.js";
import successResponse from "../../../../utils/responseHelper.js";

export const createDeliveryController = async (req, res) => {
  try {
    const deliveryData = req.body; // orderId, addressId, deliveryDate
    // schema validation
    const delivery = await deliveryService.createDeliveryService(deliveryData);
    successResponse(res, delivery, "Delivery created successfully", 201);
  } catch (error) {
    throw new AppError(`Failed to create delivery: ${error.message}`, 500);
  }
};

export const getDeliveriesController = async (req, res) => {
  try {
    const deliveries = await deliveryService.getDeliveriesService(); // 100
    successResponse(res, deliveries, "Deliveries retrieved successfully", 200);
  } catch (error) {
    throw new AppError(`Failed to fetch deliveries: ${error.message}`, 500);
  }
};

export const getDeliveryByIdController = async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const delivery = await deliveryService.getDeliveryByIdService(deliveryId);
    successResponse(res, delivery, "Delivery retrieved successfully", 200);
  } catch (error) {
    throw new AppError(`Failed to fetch delivery: ${error.message}`, 500);
  }
};

export const updateDeliveryController = async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const deliveryDetails = req.body;
    const delivery = await deliveryService.updateDeliveryService(
      deliveryId,
      deliveryDetails,
    );
    successResponse(res, delivery, "Delivery updated successfully", 200);
  } catch (error) {
    throw new AppError(`Failed to update delivery: ${error.message}`, 500);
  }
};

export const updateDeliveryStatusController = async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const deliveryStatus = req.body.status;
    const delivery = await deliveryService.updateDeliveryStatusService(
      deliveryId,
      deliveryStatus,
    );
    successResponse(res, delivery, "Delivery status updated successfully", 200);
  } catch (error) {
    throw new AppError(
      `Failed to update delivery status: ${error.message}`,
      500,
    );
  }
};
