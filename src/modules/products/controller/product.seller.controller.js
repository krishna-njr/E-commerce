import { asyncWrapper } from "../../../../utils/asyncWrapper.js";
import * as productService from "../service/product.service.js";

export const getSellerProductsFiltered = asyncWrapper(async (req, res) => {
  const filters = {
    ...req.query,
    sellerId: req.user.id,
  };

  const products = await productService.filterProductsService(filters);
  res
    .status(200)
    .json({ status: true, message: 'Filtered Products', data: products });
});


// POST    /products       # Add a product
// GET     /products       # Get all products
// GET     /products/:id   # Get products by ID
// PATCH   /products/:id   # Editing a product
// DELETE  /products/:id   # Deleting a product


export const addProductController = asyncWrapper(async (req, res) => {

  const productDetails = req.body; // name, price, description? 
  const newProduct = await productService.addProductService(productDetails);
  res
    .status(201)
    .json({
      status: true, message: 'New product is created successfully', data: {
        product: newProduct
      }
    });
});


export const getProductController = asyncWrapper(async (req, res) => {

  const productId = req.params.id; // name, price, description? 
  const product = await productService.getProductWithIdService(productId);
  res
    .status(200)
    .json({
      status: true, message: 'Successfully retrieve product', data: {
        product: product
      }
    });
});

export const deleteProductController = asyncWrapper(async (req, res) => {

  const productId = req.params.id; // name, price, description? 
  const deletedProduct = await productService.deleteProductService(productId);
  res
    .status(200)
    .json({
      status: true, message: 'Successfully deleted product', data: {
        product: deletedProduct
      }
    });
});


export const editProductController = asyncWrapper(async (req, res) => {

  const productDetails = {
    id: req.params.id,
    ...req.body
  }
  // console.log(productDetails);

  const editedProduct = await productService.editProductService(productDetails);
  res
    .status(200)
    .json({
      status: true, message: 'Product edit successfully', data: {
        product: editedProduct
      }
    });
})