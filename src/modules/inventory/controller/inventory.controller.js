import * as inventoryService from "../service/inventory.service.js";
import AppError from "../../../../utils/AppError.js";
import successResponse from "../../../../utils/responseHelper.js";

export const createInventoryController = async (req, res) => {
  try {
    const { productId, quantity } = req.body; // schema validation
    // schema validation
    const createdInventory = await inventoryService.createInventoryService({
      productId,
      quantity,
    });
    successResponse(
      res,
      createdInventory,
      "Inventory created successfully",
      201,
    );
  } catch (err) {
    // next(err);
    throw new AppError(`Failed to create inventory: ${err.message}`, 500);
  }
};

export const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryService.getInventoryService(); // 100
    successResponse(res, inventory, "Inventory retrieved successfully", 200);
  } catch (err) {
    throw new AppError(`Failed to get inventory: ${err.message}`, 500);
  }
};

export const getInventoryByProductIdController = async (req, res) => {
  try {
    const productId = req.params.id;
    // console.log("getInventoryByProductIdController", productId);
    const inventory =
      await inventoryService.getInventoryByProductIdService(productId);
    successResponse(res, inventory, "Inventory retrieved successfully", 200);
  } catch (err) {
    throw new AppError(
      `Failed to get inventory by product ID: ${err.message}`,
      500,
    );
  }
};

export const updateInventoryController = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("updateInventoryController", productId);
    const { quantity } = req.query; // quantity :
    const updatedInventory = await inventoryService.updateInventoryService(
      productId,
      Number.parseInt(quantity),
    );
    successResponse(
      res,
      updatedInventory,
      "Inventory updated successfully",
      201,
    );
  } catch (err) {
    throw new AppError(`Failed to update inventory: ${err.message}`, 500);
  }
};
