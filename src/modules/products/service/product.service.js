import AppError from "../../../../utils/AppError.js";
import * as productRepository from "../repositories/product.repository.js";

export const getAllProductsService = async (limit) => {
  try {
    const products = await productRepository.getAllProduct(limit);
    if (!products || products.length === 0) {
      throw new AppError("No products found in the database", 404);
    }
    return products;
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.error("Error in getAllProductsService:", err.message); // *******************
    throw new AppError("Failed to fetch products due to a server error", 500);
  }
};

export const filterProductsService = async (queryParams) => {
  try {
    if (queryParams.length() === 0) {
      throw new AppError("Filter Condition are not passed", 400);
    }
    return await productRepository.filterProduct(queryParams);
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(
      "Filtering failed. Please check your query parameters.",
      400,
    );
  }
};

export const getPaginatedProductsService = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    return await productRepository.getPaginated(skip, limit);
  } catch (err) {
    throw new AppError("Failed to load paginated products", 500);
  }
};

export const searchProductService = async (productName) => {
  try {
    if (!productName) {
      throw new AppError("Search query cannot be empty", 400);
    }

    return await productRepository.searchProduct(productName);
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("An error occurred during search", 500);
  }
};

export const getSortedProductsService = async (
  type,
  sortBy = "id",
  order = "desc",
) => {
  try {
    if (!type) {
      throw new AppError("Product type is required for sorting", 400);
    }

    // ["price", "createdAt", "id", "name"];

    return await productRepository.getProductsSorted(type, sortBy, order);
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("Failed to retrieve sorted products", 500);
  }
};

export const getProductWithIdService = async (productId) => {
  try {
    if (!productId) {
      throw new AppError("Product id is required to get product", 400);
    }

    return await productRepository.getProductById(productId);
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("Failed to retrieve product", 500);
  }
};

export const addProductService = async (productDetails) => {
  try {
    if (
      !productDetails.description ||
      (!productDetails.name && !productDetails.price)
    ) {
      throw new AppError("Product details is required to add product", 400);
    }

    return await productRepository.addProduct(productDetails);
  } catch (err) {
    // console.log(err.message);
    if (err instanceof AppError) throw err;
    throw new AppError("Failed to add product", 500);
  }
};

export const editProductService = async (details) => {
  try {
    const { id, ...productDetails } = details;
    if (!id) {
      throw new AppError("Product id is required to edit product", 400);
    }

    return await productRepository.editProductById(id, productDetails);
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("Failed to edit product", 500);
  }
};

export const deleteProductService = async (productId) => {
  try {
    if (!productId) {
      throw new AppError("Product id is required to delete product", 400);
    }

    return await productRepository.deleteProductById(productId);
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("Failed to delete product", 500);
  }
};
