import { Router } from "express";
import * as publicController from "../controller/product.public.controller.js";

const router = Router();

router.get("/", publicController.getAllProducts);
router.get("/search", publicController.searchProducts);
router.get("/browse", publicController.getPaginatedProducts);
router.get("/sort", publicController.getSortedProducts);

export { router };
