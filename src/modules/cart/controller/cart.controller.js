import * as cartService from "../service/cart.service.js";
import AppError from "../../../../utils/appError.js";
import successResponse from "../../../../utils/responseHelper.js";

export const getCartController = async (req, res) => {
  try {
    // const userId = req.user.id;
    const userId = req.params.id;
    // schema validation
    const cart = await cartService.getCartService(userId);

    successResponse(res, cart, "Cart retrieved successfully", 200);
  } catch (error) {
    throw new AppError(`Failed to get cart: ${error.message}`, 500);
  }
};

export const addItemToCartController = async (req, res) => {
  try {
    // const userId = req.user.id;
    const userId = req.params.id;
    const productId = req.params.itemId;

    const quantity = req.query.quantity;

    // console.log("addItemToCartController", userId, productId, quantity);

    // schema validation
    const addedCart = await cartService.addItemToCartService(
      userId,
      productId,
      quantity,
    );
    successResponse(res, addedCart, "Item added to cart successfully", 201);
  } catch (error) {
    throw new AppError(`Failed to add item to cart: ${error.message}`, 500);
  }
};

export const updateCartItemQuantityController = async (req, res) => {
  try {
    const userId = req.params.id;
    const itemId = req.params.itemId;
    const { quantity } = req.parmas.id;
    // schema validation
    const updatedCart = await cartService.updateCartItemQuantityService(
      userId,
      itemId,
      quantity,
    );
    successResponse(
      res,
      updatedCart,
      "Cart item quantity updated successfully",
      200,
    );
  } catch (error) {
    throw new AppError(
      `Failed to update cart item quantity: ${error.message}`,
      500,
    );
  }
};

export const removeCartItemController = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    // schema validation
    successResponse(res, cart, "Cart retrieved successfully", 200);
  } catch (error) {
    throw new AppError(`Failed to get cart: ${error.message}`, 500);
  }
};

export const clearCartController = async (req, res) => {
  try {
    const userId = req.params.id;
    // schema validation
    const cart = await cartService.getCart(userId);
    successResponse(res, cart, "Cart retrieved successfully", 200);
  } catch (error) {
    throw new AppError(`Failed to clear cart: ${error.message}`, 500);
  }
};
