import { Router } from "express";
import * as sellerController from "../controller/product.seller.controller.js";
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
// import { protect, authorizeSeller } from "../middleware/auth.middleware.js";

const router = Router();

router.use(validateAuthentication);

router.use(authorize("SELLER"));

router.get(
  "/",
  validateRequest(getSellerProductsSchema),
  sellerController.getSellerProductsController,
);

router.post(
  "/",
  validateRequest(addProductSchema),
  sellerController.addProductController,
);

router.get(
  "/:id",
  validateRequest(getProductSchema),
  sellerController.getProductByIdController,
);

router.delete(
  "/:id",
  validateRequest(deleteProductSchema),
  sellerController.deleteProductController,
);

router.patch(
  "/:id",
  validateRequest(editProductSchema),
  sellerController.editProductController,
);

export { router };
