import { prisma } from "../../../../clients/pg-client.js";
import AppError from "../../../../utils/AppError.js";

export const getAllProduct = async (limit) => {
  try {
    const products = await prisma.product.findMany({
      take: limit,
    });
    // console.log("Products retrieved from database:", products);
    return products;
  } catch (err) {
    console.error("Database Error in getAllProduct:", err.message);
    throw new AppError(`Database Error in getAllProduct : ${err.message}`);
  }
};

export const filterProduct = async (conditions) => {
  try {
    return await prisma.product.findMany({
      where: conditions,
    });
  } catch (err) {
    console.error("Database Error in filterProduct:", err.message);
    throw new AppError(`Database Error in filterProduct : ${err.message}`);
  }
};

export const getPaginated = async (skip = 0, take = 10) => {
  try {
    return await prisma.product.findMany({
      skip: skip,
      take: take,
    });
  } catch (err) {
    console.error("Database Error in getPaginated: ", err, message);
    throw new AppError(`Database Error in getPaginated : ${err.message}`);
  }
};

export const searchProduct = async (searchName) => {
  try {
    return await prisma.product.findMany({
      where: {
        name: {
          contains: searchName,
          mode: "insensitive",
        },
      },
    });
  } catch (err) {
    console.error("Database Error in searchProduct:", err.message);
    throw new AppError(`Database Error in searchProduct : ${err.message}`);
  }
};

export const getProductsSorted = async (
  type,
  sortByField = "id",
  direction = "desc",
) => {
  try {
    return await prisma.product.findMany({
      where: { type },
      orderBy: {
        [sortByField]: direction,
      },
    });
  } catch (err) {
    console.error(`Database Error in getProductsSorted : `, err.message);
    throw new AppError(`Database Error in getProductsSorted : ${err.message}`);
  }
};

// POST    /products       # Add a product
// GET     /products       # Get all products
// GET     /products/:id   # Get products by ID
// PATCH   /products/:id   # Editing a product
// DELETE  /products/:id   # Deleting a product

export const addProduct = async ({ name, description, price }) => {
  try {
    return await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: price,

        inventory: {
          create: {},
        },

        // cartItems: {
        //   create: [],
        // },

        // orderItems: {
        //   create: [],
        // },
      },
    });
  } catch (err) {
    console.error(`Database Error in addProduct : `, err.message);
    throw new AppError(`Database Error in addProduct : ${err.message}`);
  }
};

export const getProductById = async (productId) => {
  try {
    return await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  } catch (err) {
    console.error("Database Error in getProductById:", err.message);
    throw new AppError(`Database Error in getProductById : ${err.message}`);
  }
};

export const deleteProductById = async (productId) => {
  try {
    return await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  } catch (err) {
    console.error("Database Error in deleteProductById:", err.message);
    throw new AppError(`Database Error in deleteProductById : ${err.message}`);
  }
};

export const editProductById = async (productId, productDetails) => {
  try {
    return await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...productDetails,
      },
    });
  } catch (err) {
    console.error("Database Error in deleteProductById:", err.message);
    throw new AppError(`Database Error in deleteProductById : ${err.message}`);
  }
};
