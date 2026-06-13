import { prisma } from "../../../../clients/pg-client.js";
import AppError from "../../../../utils/appError.js";

export const createInventory = async (data) => {
  try {
    const inventory = await prisma.inventory.create({ data });
    if (!inventory) {
      throw new AppError("Failed to create inventory", 500);
    }
    return inventory;
  } catch (err) {
    console.error("Internal Server Error : ", err.message);
    if (err instanceof AppError) throw err;
    throw new AppError(`Internal Server Error : ${err.message}`);
  }
};

export const getInventory = async () => {
  try {
    const inventory = await prisma.inventory.findMany({
      include: {
        product: true,
      },
      take: 100,
    });
    if (!inventory) {
      throw new AppError("No inventory found", 404);
    }
    return inventory;
  } catch (err) {
    console.error("Internal Server Error : ", err.message);
    if (err instanceof AppError) throw err;
    throw new AppError(`Internal Server Error : ${err.message}`);
  }
};

export const getInventoryByProductId = async (productId) => {
  try {
    const inventory = await prisma.inventory.findUnique({
      where: {
        productId: productId,
      },
      include: {
        product: true,
      },
    });
    if (!inventory) {
      throw new AppError("Inventory not found for the product", 404);
    }
    return inventory;
  } catch (err) {
    console.error("Internal Server Error : ", err.message);
    if (err instanceof AppError) throw err;
    throw new AppError(`Internal Server Error : ${err.message}`);
  }
};

export const updateInventory = async (productId, data) => {
  try {
    const inventory = await prisma.inventory.update({
      where: {
        productId: productId,
      },
      data: data, // increase or decrease.
    });
    if (!inventory) {
      throw new AppError("Failed to update inventory", 500);
    }
    return inventory;
  } catch (err) {
    console.error("Internal Server Error : ", err.message);
    if (err instanceof AppError) throw err;
    throw new AppError(`Internal Server Error : ${err.message}`);
  }
};

export const decreaseInventoryQuantity = async (productId, quantity) => {
  try {
    const inventory = await prisma.inventory.update({
      where: {
        productId: productId,
      },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });
    if (!inventory) {
      throw new AppError("Failed to decrease inventory quantity", 500);
    }
    return inventory;
  } catch (err) {
    console.error("Internal Server Error : ", err.message);
    if (err instanceof AppError) throw err;
    throw new AppError(`Internal Server Error : ${err.message}`);
  }
};

export const increaseInventoryQuantity = async (productId, quantity) => {
  try {
    const inventory = await prisma.inventory.update({
      where: {
        productId: productId,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
    if (!inventory) {
      throw new AppError("Failed to increase inventory quantity", 500);
    }
    return inventory;
  } catch (err) {
    console.error("Internal Server Error : ", err.message);
    if (err instanceof AppError) throw err;
    throw new AppError(`Internal Server Error : ${err.message}`);
  }
};
