import { asyncWrapper } from "../../../../utils/asyncWrapper.js";
import * as productService from "../service/product.service.js";

export const getAllProducts = asyncWrapper(async (req, res) => {

  const products = await productService.getAllProductsService();
  res.status(200).json({ status: true, data: products });

});

export const searchProducts = asyncWrapper(async (req, res) => {

  const productName = req.query.name; // e.g., /products/search?name=phone
  const products = await productService.searchProductService(productName);
  res.status(200).json({ status: true, data: products });

});

export const getPaginatedProducts = asyncWrapper(async (req, res) => {

  const { page, limit } = req.query; // e.g., /products/browse?page=2&limit=10
  const products = await productService.getPaginatedProductsService(
    page,
    limit,
  );
  res
    .status(200)
    .json({ status: true, page: Number(page) || 1, data: products });

});

export const getSortedProducts = asyncWrapper(async (req, res) => {

  const { type, sortBy, order } = req.query;
  const products = await productService.getSortedProductsService(
    type,
    sortBy,
    order,
  );
  res.status(200).json({ status: true, data: products });

});
