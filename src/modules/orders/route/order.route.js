import { Router } from "express";
import * as orderController from "../controller/order.controller.js";

const router = Router();

router.post('/', orderController.createOrderController);

router.get('/', orderController.getOrdersController);

router.get('/:id', orderController.getOrderByIdController);

router.patch('/:id/status', orderController.updateOrderStatusController);

router.patch('/:id/payment-status', orderController.updatePaymentStatusController);

router.delete('/:id', orderController.cancelOrderController);

export { router };
