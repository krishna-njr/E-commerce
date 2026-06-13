import { Router } from "express";
import * as cartController from "../controller/cart.controller.js";
// import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// router.use(authenticate);

router.get("/:id", cartController.getCartController);

router.post("/:id/items/:itemId", cartController.addItemToCartController);

router.patch(
  "/:id/items/:itemId",
  cartController.updateCartItemQuantityController,
);

router.delete("/:id/items/:itemId", cartController.removeCartItemController);

router.delete("/:id/clear", cartController.clearCartController);

export { router };
