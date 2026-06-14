import { asyncWrapper } from "../../../../utils/asyncWrapper.js";
import * as orderServices from "../service/order.service.js";

export const createOrderController = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const items = req.body.items;
  const totalAmount = req.body.totalAmount;
  const addressId = req.body.addressId;

  const createdOrder = await orderServices.createOrderService({
    userId,
    items,
    totalAmount,
    addressId,
  });

  res.status(201).json({
    status: true,
    message: "Order Created",
    date: createdOrder,
  });
});

export const getOrdersController = asyncWrapper(async (req, res) => {
  const order = await orderServices.getOrdersService();

  res.status(200).json({
    status: true,
    message: "Successfully Retrieved",
    date: order,
  });
});

export const getOrderByIdController = asyncWrapper(async (req, res) => {
  const productId = req.params.id;

  const order = await orderServices.getOrderByIdService(productId);

  res.status(200).json({
    status: true,
    message: "Successfully Retrieved",
    date: order,
  });
});

export const updateOrderStatusController = asyncWrapper(async (req, res) => {
  const productId = req.params.id;
  const status = req.query.status;

  const updatedOrder = await orderServices.updateOrderStatusService(
    productId,
    status,
  );

  res.status(201).json({
    status: true,
    message: "Order Updated",
    date: updatedOrder,
  });
});

export const updatePaymentStatusController = asyncWrapper(async (req, res) => {
  const productId = req.params.id;
  const paymentStatus = req.query.paymentStatus;

  const updatedOrder = await orderServices.updatePaymentStatusService(
    productId,
    paymentStatus,
  );

  res.status(201).json({
    status: true,
    message: "Status Updated",
    date: updatedOrder,
  });
});

export const cancelOrderController = asyncWrapper(async (req, res) => {
  const productId = req.query.id;

  const deletedOrder = await orderServices.cancelOrderService(productId);

  res.status(201).json({
    status: true,
    message: "Order Deleted",
    date: deletedOrder,
  });
});
