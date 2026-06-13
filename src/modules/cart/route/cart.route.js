import { Router } from "express";
import * as cartController from "../controller/cart.controller.js";
import {
  validateAuthentication,
  authorize,
} from "../middleware/cart.middleware.js";

const router = Router();

router.use(validateAuthentication);

router.get("/", cartController.getCartController);

// items -> products:
router.post("/items/:itemId", cartController.addItemToCartController);

router.patch("/items/:itemId", cartController.updateCartItemQuantityController);

router.delete("/items/:itemId", cartController.removeCartItemController);

router.delete("/clear", cartController.clearCartController);

export { router };
