import { asyncWrapper } from "../../../../utils/asyncWrapper.js";
import * as productService from "../service/product.service.js";
import successResponse from "../../../../utils/responseHelper.js";
import AppError from "../../../../utils/appError.js";

export const getSellerProductsController = asyncWrapper(async (req, res) => {
  const sellerId = req.user.id;
  let limit = req.query.limit || 10; // Default limit to 10 if not provided
  const products = await productService.getAllProductsService(sellerId, limit); // limit to 100 :  at services level
  successResponse(res, products, "Seller Products", 200);
});

export const getSellerProductsFilteredController = asyncWrapper(
  async (req, res) => {
    const filters = {
      ...req.query,
      sellerId: req.user.id,
    };

    const products = await productService.getProductsFilterService(filters);
    successResponse(res, products, "Filtered Products", 200);
  },
);

// POST    /products       # Add a product
// GET     /products       # Get all products
// GET     /products/:id   # Get products by ID
// PATCH   /products/:id   # Editing a product
// DELETE  /products/:id   # Deleting a product

export const addProductController = asyncWrapper(async (req, res) => {
  const productDetails = req.body; // name, price, description?
  const newProduct = await productService.addProductService(productDetails);
  successResponse(res, newProduct, "New Product Created", 201);
});

export const getProductByIdController = asyncWrapper(async (req, res) => {
  const productId = req.params.id; // name, price, description?
  const product = await productService.getProductWithIdService(productId);
  successResponse(res, product, "Product Retrieved", 200);
});

export const deleteProductController = asyncWrapper(async (req, res) => {
  const productId = req.params.id; // name, price, description?
  const deletedProduct = await productService.deleteProductService(productId);
  successResponse(res, deletedProduct, "Product Deleted", 200);
});

export const editProductController = asyncWrapper(async (req, res) => {
  const productDetails = {
    id: req.params.id,
    ...req.body,
  };

  const updatedProduct =
    await productService.editProductService(productDetails);
  successResponse(res, updatedProduct, "Product Updated", 200);
});
