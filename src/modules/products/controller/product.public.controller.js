import { asyncWrapper } from "../../../../utils/asyncWrapper.js";
import * as productService from "../service/product.service.js";
import successResponse from "../../../../utils/responseHelper.js";

export const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await productService.getAllProductsService();
  return successresponse(res, products, "Products retrieved successfully", 200);
});

export const searchProducts = asyncWrapper(async (req, res) => {
  const productName = req.query.name; // e.g., /products/search?name=phone
  const products = await productService.searchProductService(productName);
  return successResponse(res, products, "Products retrieved successfully", 200);
});

export const getPaginatedProducts = asyncWrapper(async (req, res) => {
  const { page, limit } = req.query; // e.g., /products/browse?page=2&limit=10
  const products = await productService.getPaginatedProductsService(
    page,
    limit,
  );
  return successResponse(res, products, "Products retrieved successfully", 200);
});

export const getSortedProducts = asyncWrapper(async (req, res) => {
  const { type, sortBy, order } = req.query;
  const products = await productService.getSortedProductsService(
    type,
    sortBy,
    order,
  );
  return successResponse(res, products, "Products retrieved successfully", 200);
});
