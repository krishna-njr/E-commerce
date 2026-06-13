import { Router } from "express";

import * as sellerController from "../controller/product.seller.controller.js";
// import { protect, authorizeSeller } from "../middleware/auth.middleware.js";

const router = Router();
import {
  validateAuthentication,
  authorize,
} from "../middleware/product.middleware.js";

// Protect all seller routes with authentication and role authorization middlewares
router.use(validateAuthentication);
router.use(authorize("SELLER"));

router.get("/seller", sellerController.getSellerProductsFiltered);

router.post("/seller", sellerController.addProductController);

router.get("/seller/:id", sellerController.getProductController);

router.delete("/seller/:id", sellerController.deleteProductController);

router.patch("/seller/:id", sellerController.editProductController);

export { router };
