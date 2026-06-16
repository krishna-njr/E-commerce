import { prisma } from "../../../../clients/pg-client.js";
import AppError from "../../../../utils/AppError.js";

export const findCartByUserId = async (userId) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart) {
      throw new AppError("Cart not found for the user", 404);
    }
    return cart;
  } catch (error) {
    console.log(error.message);
    if (error instanceof AppError) throw error;
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};
export const createCart = async (userId) => {
  try {
    const newCart = await prisma.cart.create({
      data: { userId },
    });
    if (!newCart) {
      throw new AppError("Failed to create cart", 400);
    }
    return newCart;
  } catch (error) {
    console.log(error.message);
    if (error instanceof AppError) throw error;
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};

export const findCartItem = async (cartId, productId) => {
  try {
    const cartItem = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });
    // if (!cartItem) return null;
    return cartItem;
  } catch (error) {
    console.log(error.message);
    if (error instanceof AppError) throw error;
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};

export const findCartItemById = async (itemId) => {
  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });
    if (!cartItem) {
      throw new AppError("Cart item not found", 404);
    }
    return cartItem;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};
export const createCartItem = async (data) => {
  try {
    const cartItem = await prisma.cartItem.create({ data });
    if (!cartItem) {
      throw new AppError("Failed to create cart item", 400);
    }
    return cartItem;
  } catch (error) {
    console.log(error.message);
    if (error instanceof AppError) throw error;
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};
export const updateCartItem = async (itemId, quantity = 1) => {
  try {
    const updateItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
    if (!updateItem) {
      throw new AppError("Failed to update cart item", 400);
    }
    return updateItem;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};
export const deleteCartItem = async (itemId) => {
  try {
    const deletedItem = await prisma.cartItem.delete({ where: { id: itemId } });
    if (!deletedItem) {
      throw new AppError("Failed to delete cart item", 400);
    }
    return deletedItem;
  } catch (error) {
    console.log(error.message);
    if (error instanceof AppError) throw error;
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};

export const clearCart = async (cartId) => {
  try {
    const deletedItems = await prisma.cartItem.deleteMany({
      where: { cartId },
    });
    if (!deletedItems) {
      throw new AppError("Failed to clear cart", 400);
    }
    return deletedItems;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};

// ****************
export const getCartByIdWithTx = async (userId, tx) => {
  try {
    const userCart = await tx.cart.findUnique({
      // tx : also prisma but it's a transaction
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });
    if (!userCart) {
      throw new AppError("Failed to get user cart", 400);
    }
    return userCart;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};

export const cleanCartWithTx = async (cartId, tx) => {
  try {
    const deletedItems = await tx.cartItem.deleteMany({
      where: { cartId },
    });
    if (!deletedItems) {
      throw new AppError("Failed to clear cart", 400);
    }
    return deletedItems;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log(error.message);
    throw new AppError(`Internal Server Error : ${error.message}`, 500);
  }
};
