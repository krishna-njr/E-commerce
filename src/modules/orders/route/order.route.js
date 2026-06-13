import { Router } from "express";
import * as orderController from "../controller/order.controller.js";
import {
  authorize,
  validateAuthentication,
} from "../middleware/order.middleware.js";

const router = Router();

router.use(validateAuthentication);

router.use(authorize("CUSTOMER"));

router.post("/", orderController.createOrderController);

router.get("/", orderController.getOrdersController);

router.get("/:id", orderController.getOrderByIdController);

router.patch("/:id/status", orderController.updateOrderStatusController);

router.patch(
  "/:id/payment-status",
  orderController.updatePaymentStatusController,
);

router.delete("/:id", orderController.cancelOrderController);

export { router };
