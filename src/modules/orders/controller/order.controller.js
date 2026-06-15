import { asyncWrapper } from "../../../../utils/asyncWrapper.js";
import successResponse from "../../../../utils/responseHelper.js";
import * as orderServices from "../service/order.service.js";

export const createOrderController = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  // const items = req.body.items;
  // const totalAmount = req.body.totalAmount;
  const addressId = req.params.id;

  const createdOrder = await orderServices.createOrderService({
    userId,
    // items,
    // totalAmount,
    addressId,
  });

  successResponse(res, createdOrder, "Order Created", 201);
});

export const getOrdersController = asyncWrapper(async (req, res) => {
  const order = await orderServices.getOrdersService();

  successResponse(res, order, "Orders Retrieved", 200);
});

export const getOrderByIdController = asyncWrapper(async (req, res) => {
  const orderId = req.params.id;

  const order = await orderServices.getOrderByIdService(orderId);

  successResponse(res, order, "Order Retrieved", 200);
});

export const updateOrderStatusController = asyncWrapper(async (req, res) => {
  const orderId = req.params.id;
  const status = req.query.status;
  // console.log("updateOrderStatusController", orderId, status);

  //  ! here we have to check what status is allowed to update or not.

  const updatedOrder = await orderServices.updateOrderStatusService(
    orderId,
    status,
  );

  successResponse(res, updatedOrder, "Order Updated", 201);
});

export const updatePaymentStatusController = asyncWrapper(async (req, res) => {
  const orderId = req.params.id;
  const paymentStatus = req.query.status;

  //  ! here we have to check what status is allowed to update or not.

  const updatedOrder = await orderServices.updatePaymentStatusService(
    orderId,
    paymentStatus,
  );

  successResponse(res, updatedOrder, "Payment Status Updated", 201);
});

export const cancelOrderController = asyncWrapper(async (req, res) => {
  const orderId = req.params.id;

  const canceledOrder = await orderServices.cancelOrderService(orderId);

  successResponse(res, canceledOrder, "Order Cancelled", 201);
});
