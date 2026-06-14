import AppError from "../../../../utils/appError.js";
import * as inventoryRepository from "../repositories/inventory.repository.js";

export const createInventoryService = async ({ productId, quantity }) => {
  try {
    return await inventoryRepository.createInventory(productId, quantity);
    // ? transaction to create product and inventory together, quantity is updated on both the product and inventory when product is added or updated.
  } catch (err) {
    throw new AppError(`Failed to create inventory: ${err.message}`, 500);
  }
};

export const getInventoryService = async () => {
  try {
    return await inventoryRepository.getInventory(); // 100
  } catch (err) {
    throw new AppError(`Failed to get inventory: ${err.message}`, 500);
  }
};

export const getInventoryByProductIdService = async (productId) => {
  try {
    return await inventoryRepository.getInventoryByProductId(productId);
  } catch (err) {
    throw new AppError(
      `Failed to get inventory by product ID: ${err.message}`,
      500,
    );
  }
};

export const updateInventoryService = async (productId, quantity) => {
  try {
    return await inventoryRepository.updateInventory(productId, quantity);
    // transaction to update product and inventory together if needed quantity is updated to 0 or from 0 to >0:
  } catch (err) {
    throw new AppError(`Failed to update inventory: ${err.message}`, 500);
  }
};
