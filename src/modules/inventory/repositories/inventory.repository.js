import { prisma } from "../../../../clients/pg-client.js";
import AppError from "../../../../utils/appError.js";

export const createInventory = async (productId, quantity) => {
  try {
    // first check the existence of product
    const product = await prisma.inventory.findUnique({
      where: {
        productId: productId,
      },
    });
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    const inventory = await updateInventory(productId, quantity);
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

export const updateInventory = async (productId, quantity) => {
  try {
    const inventory = await prisma.inventory.update({
      where: {
        productId: productId,
      },
      data: { quantity }, // increase or decrease.
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

// ****************
export const validateInventoryItemsWithTx = async (items, tx) => {
  // items : cartItems
  try {
    for (const item of items) {
      const stock = item.prodcut.inventory.quantity;
      if (stock < item.quantity) {
        throw new AppError(`${item.product.name} is out of stock`, 500);
      }
    }
  } catch (error) {
    if (error instanceof AppError) throw err;
    throw new AppError(`Internal Server Error: ${err.message}`);
  }
};

export const decreaseInventoryItemsQuantityWithTx = async (items, tx) => {
  // items : cartItems
  try {
    for (const item of items) {
      const inventoryItem = await tx.inventory.update({
        where: {
          productId: item.productId,
        },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });
      if (!inventoryItem)
        throw new AppError(
          `Failed to decrease inventory for ${item.product.name}`,
          500,
        );
    }
  } catch (error) {
    if (error instanceof AppError) throw err;
    throw new AppError(`Internal Server Error: ${err.message}`);
  }
};

export const createProductInInventoryWithTx = async (productId, tx) => {
  try {
    const inventory = await tx.inventory.create({
      data: {
        productId: productId,
        quantity: 1, // default quantity for new product
      },
    });
    return inventory;
  } catch (error) {
    if (error instanceof AppError) throw err;
    throw new AppError(`Internal Server Error: ${err.message}`);
  }
};
