import { Router } from "express";
import * as cartController from "../controller/cart.controller.js";
import {
  validateAuthentication,
  authorize,
  validateRequest,
} from "../middleware/cart.middleware.js";
import {
  addToCartSchema,
  removeFromCartSchema,
  updateCartItemSchema,
} from "../validations/cart.validation.js";

const router = Router();

router.use(validateAuthentication);

router.use(authorize("CUSTOMER"));

router.get("/", cartController.getCartController);

// items -> products:
router.post(
  "/items/:itemId",
  validateRequest(addToCartSchema),
  cartController.addItemToCartController,
);

router.patch(
  "/items/:itemId",
  validateRequest(updateCartItemSchema),
  cartController.updateCartItemQuantityController,
);

router.delete(
  "/items/:itemId",
  validateRequest(removeFromCartSchema),
  cartController.removeCartItemController,
);

router.delete("/clear", cartController.clearCartController);

export { router };
