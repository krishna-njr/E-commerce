import { Router } from "express";
import * as inventoryController from "../controller/inventory.controller.js";

const router = Router();

router.post("/", inventoryController.createInventoryController);

router.get("/", inventoryController.getInventoryController);

router.get(
  "/:productId",
  inventoryController.getInventoryByProductIdController,
);

router.patch("/:productId", inventoryController.updateInventoryController);

export { router };
