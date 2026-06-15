import { asyncWrapper } from "../../../../utils/asyncWrapper.js";
import * as productService from "../service/product.service.js";
import successResponse from "../../../../utils/responseHelper.js";

export const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await productService.getAllProductsService();
  return successResponse(res, products, "Products retrieved successfully", 200);
});

export const getProductsByFilter = asyncWrapper(async (req, res) => {
  const filters = req.query;
  // const price = filters.price ? Number(filters.price) : undefined;

  const products = await productService.getProductsFilterService(filters);

  return successResponse(res, products, "Products retrieved successfully", 200);
});
