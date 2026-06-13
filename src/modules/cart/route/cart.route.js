import { Router } from "express";
import * as cartController from "../controller/cart.controller.js";
// import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// router.use(authenticate);

router.get("/", cartController.getCart);

router.post("/items", cartController.addItem);

router.patch("/items/:itemId", cartController.updateItem);

router.delete("/items/:itemId", cartController.removeItem);

router.delete("/clear", cartController.clearCart);

export { router as cartRouter };
