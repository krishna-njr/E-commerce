import { Router } from "express";

import * as sellerController from "../controller/product.seller.controller.js";
// import { protect, authorizeSeller } from "../middleware/auth.middleware.js";

const router = Router();
import {
  validateAuthentication,
  authorize,
  validateRequest,
} from "../middleware/product.middleware.js";
import {
  addProductSchema,
  deleteProductSchema,
  editProductSchema,
  getProductSchema,
  getSellerProductsSchema,
} from "../validations/products.validation.js";

router.use(validateAuthentication);

router.use(authorize("SELLER"));

router.get(
  "/seller",
  validateRequest(getSellerProductsSchema),
  sellerController.getSellerProductsController,
);

router.post(
  "/seller",
  validateRequest(addProductSchema),
  sellerController.addProductController,
);

router.get(
  "/seller/:id",
  validateRequest(getProductSchema),
  sellerController.getProductByIdController,
);

router.delete(
  "/seller/:id",
  validateRequest(deleteProductSchema),
  sellerController.deleteProductController,
);

router.patch(
  "/seller/:id",
  validateRequest(editProductSchema),
  sellerController.editProductController,
);

export { router };
