import { Router } from "express";

import * as sellerController from "../controller/product.seller.controller.js";
// import { protect, authorizeSeller } from "../middleware/auth.middleware.js";

const router = Router();

// Protect all seller routes with authentication and role authorization middlewares
// router.use(protect);
// router.use(authorizeSeller);

router.get("/products", sellerController.getSellerProductsFiltered);

export default router;
