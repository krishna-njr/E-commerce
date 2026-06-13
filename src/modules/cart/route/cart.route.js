import { Router } from "express";
import * as cartController from "../controller/cart.controller.js";
// import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// router.use(authenticate);

router.get("/", cartController.getCartController);

router.post("/items", cartController.addItemToCartController);

router.patch("/items/:itemId", cartController.updateCartItemQuantityController);

router.delete("/items/:itemId", cartController.removeCartItemController);

router.delete("/clear", cartController.clearCartController);

export { router };
