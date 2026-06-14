import { Router } from "express";
import * as deliveryController from "../controller/delivery.controller.js";
import {
  validateAuthentication,
  authorize,
} from "../middleware/delivery.middleware.js";
import { validateRequest } from "../middleware/delivery.middleware.js";
import {
  createDeliverySchema,
  getDeliveryByIdSchema,
  updateDeliverySchema,
  updateDeliveryStatusSchema,
} from "../validation/delivery.validation.js";

const router = Router();

router.use(validateAuthentication);
router.use(authorize("CUSTOMER")); // we can add "DELIVERY_PERSON" role also.

router.post(
  "/",
  validateRequest(createDeliverySchema),
  deliveryController.createDeliveryController,
);

router.get("/", deliveryController.getDeliveriesController);

router.get(
  "/:id",
  validateRequest(getDeliveryByIdSchema),
  deliveryController.getDeliveryByIdController,
);

router.patch(
  "/:id",
  validateRequest(updateDeliverySchema),
  deliveryController.updateDeliveryController,
);

router.patch(
  "/:id/status",
  validateRequest(updateDeliveryStatusSchema),
  deliveryController.updateDeliveryStatusController,
);

export { router };
