import { Router } from "express";
import * as inventoryController from "../controller/inventory.controller.js";
import {
  authorize,
  validateAuthentication,
  validateRequest,
} from "../middleware/inventory.middleware.js";
import {
  createInventorySchema,
  getInventoryByProductIdSchema,
  updateInventorySchema,
} from "../validations/inventory.validation.js";

const router = Router();

router.use(validateAuthentication);

router.use(authorize("ADMIN", "SELLER")); // ! seller are not allowed but for now we are alloiing them.

router.post(
  "/",
  validateRequest(createInventorySchema),
  inventoryController.createInventoryController,
);

router.get("/", inventoryController.getInventoryController);

router.get(
  "/:id",
  validateRequest(getInventoryByProductIdSchema),
  inventoryController.getInventoryByProductIdController,
);

router.patch(
  "/:id",
  validateRequest(updateInventorySchema),
  inventoryController.updateInventoryController,
);

export { router };
