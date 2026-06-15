import { Router } from "express";
import * as orderController from "../controller/order.controller.js";
import {
  authorize,
  validateAuthentication,
  validateRequest,
} from "../middleware/order.middleware.js";
import {
  cancelOrderSchema,
  createOrderSchema,
  getOrderByIdSchema,
  updateOrderStatusSchema,
  updatePaymentStatusSchema,
} from "../validations/orders.validation.js";

const router = Router();

router.use(validateAuthentication);

router.use(authorize("CUSTOMER"));

router.post(
  "/:id",
  validateRequest(createOrderSchema),
  orderController.createOrderController,
);

router.get("/", orderController.getOrdersController);

router.get(
  "/:id",
  validateRequest(getOrderByIdSchema),
  orderController.getOrderByIdController,
);

router.patch(
  "/status/:id",
  validateRequest(updateOrderStatusSchema),
  orderController.updateOrderStatusController,
);

router.patch(
  "/payment-status/:id",
  validateRequest(updatePaymentStatusSchema),
  orderController.updatePaymentStatusController,
);

router.delete(
  "/:id",
  validateRequest(cancelOrderSchema),
  orderController.cancelOrderController,
);

export { router };
