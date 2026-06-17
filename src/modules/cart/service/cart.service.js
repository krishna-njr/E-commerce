import * as cartRepository from "../repositories/cart.repository.js";
import AppError from "../../../../utils/AppError.js";

export const getCartService = async (userId) => {
  try {
    const cart = await cartRepository.findCartByUserId(userId);
    return cart;
  } catch (error) {
    throw new AppError(`Failed to get cart: ${error.message}`, 500);
  }
};

export const addItemToCartService = async (userId, productId, quantity) => {
  try {
    let userCart = await cartRepository.findCartByUserId(userId);
    if (!userCart) {
      userCart = await cartRepository.createCart(userId);
    }

    const existingItem = await cartRepository.findCartItem(userCart.id, productId);
    if (existingItem) {
      return await cartRepository.updateCartItem(
        existingItem.id,
        existingItem.quantity + quantity,
      );
    } else {
      // console.log("addItemToCartService", userId, productId, quantity);
      return await cartRepository.createCartItem({
        cartId: userCart.id,
        productId,
        quantity,
      });
    }
  } catch (error) {
    throw new AppError(`Failed to add item to cart: ${error.message}`, 500);
  }
};

export const updateCartItemQuantityService = async (
  userId,
  itemId,
  quantity,
) => {
  try {
    const userCart = await cartRepository.findCartByUserId(userId);
    const existingItem = await cartRepository.findCartItemById(itemId);
    console.log(
      "updateCartItemQuantityService",
      userId,
      itemId,
      quantity,
      existingItem,
      userCart,
    );
    if (!existingItem || existingItem.cartId !== userCart.id) {
      throw new AppError("Cart item not found", 404);
    }
    return await cartRepository.updateCartItem(itemId, quantity);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      `Failed to update cart item quantity: ${error.message}`,
      500,
    );
  }
};

export const removeCartItemService = async (userId, itemId) => {
  try {
    const userCart = await cartRepository.findCartByUserId(userId);
    const existingItem = await cartRepository.findCartItemById(itemId);
    if (!existingItem || existingItem.cartId !== userCart.id) {
      throw new AppError("Cart item not found", 404);
    }
    return await cartRepository.deleteCartItem(itemId);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to remove cart item: ${error.message}`, 500);
  }
};

export const clearCartService = async (userId) => {
  try {
    const userCart = await cartRepository.findCartByUserId(userId);
    return await cartRepository.clearCart(userCart.id);
  } catch (error) {
    throw new AppError(`Failed to clear cart: ${error.message}`, 500);
  }
};
