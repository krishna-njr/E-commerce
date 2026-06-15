import { Router } from "express";
import * as publicController from "../controller/product.public.controller.js";
import {
  authorize,
  validateAuthentication,
  validateRequest,
} from "../middleware/product.middleware.js";
import { getProductsFilteredSchema } from "../validations/products.validation.js";

const router = Router();

router.use(validateAuthentication);

router.use(authorize("CUSTOMER", "SELLER", "ADMIN"));

router.get("/", publicController.getAllProducts);

router.get(
  "/filter",
  validateRequest(getProductsFilteredSchema),
  publicController.getProductsByFilter,
);

export { router };
