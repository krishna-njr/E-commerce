import * as productRepository from "../repositories/product.repository.js";

class BusinessError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const getAllProductsService = async () => {
  try {
    const products = await productRepository.getAllProduct();
    if (!products || products.length === 0) {
      throw new BusinessError("No products found in the database", 404);
    }
    return products;
  } catch (err) {
    // If it's already a BusinessError, pass it up; otherwise wrap generic DB errors
    if (err instanceof BusinessError) throw err;
    throw new BusinessError(
      "Failed to fetch products due to a server error",
      500,
    );
  }
};

export const filterProductsService = async (queryParams) => {
  try {
    const whereClause = {};

    if (queryParams.category) {
      whereClause.category = queryParams.category;
    }
    if (queryParams.minPrice || queryParams.maxPrice) {
      whereClause.price = {};
      if (queryParams.minPrice)
        whereClause.price.gte = Number(queryParams.minPrice);
      if (queryParams.maxPrice)
        whereClause.price.lte = Number(queryParams.maxPrice);
    }

    return await productRepository.filterProduct(whereClause);
  } catch (err) {
    throw new BusinessError(
      "Filtering failed. Please check your query parameters.",
      400,
    );
  }
};

export const getPaginatedProductsService = async (page = 1, limit = 10) => {
  try {
    const parsedPage = Math.max(1, parseInt(page));
    const parsedLimit = Math.max(1, parseInt(limit));
    const skip = (parsedPage - 1) * parsedLimit;

    return await productRepository.getPaginated(skip, parsedLimit);
  } catch (err) {
    throw new BusinessError("Failed to load paginated products", 500);
  }
};

export const searchProductService = async (searchName) => {
  try {
    if (!searchName || searchName.trim() === "") {
      throw new BusinessError("Search query cannot be empty", 400);
    }

    return await productRepository.searchProduct(searchName.trim());
  } catch (err) {
    if (err instanceof BusinessError) throw err;
    throw new BusinessError("An error occurred during search", 500);
  }
};

export const getSortedProductsService = async (
  type,
  sortBy = "id",
  order = "desc",
) => {
  try {
    if (!type) {
      throw new BusinessError("Product type is required for sorting", 400);
    }

    const allowedSortFields = ["price", "createdAt", "id", "name"];
    const safeSortField = allowedSortFields.includes(sortBy) ? sortBy : "id";

    const safeOrder = order.toLowerCase() === "asc" ? "asc" : "desc";

    return await productRepository.getProductsSorted(
      type,
      safeSortField,
      safeOrder,
    );
  } catch (err) {
    if (err instanceof BusinessError) throw err;
    throw new BusinessError("Failed to retrieve sorted products", 500);
  }
};
