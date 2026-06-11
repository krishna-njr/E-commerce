import { prisma } from "../../../../clients/pg-client.js";

/**
 * Fetch all products without filters
 */
export const getAllProduct = async () => {
  try {
    return await prisma.product.findMany();
  } catch (err) {
    // Log internally for debugging, then rethrow for the Service layer to catch
    console.error("Database Error in getAllProduct:", err);
    throw err;
  }
};

/**
 * Filter products based on a structured Prisma where clause
 */
export const filterProduct = async (whereClause) => {
  try {
    return await prisma.product.findMany({
      where: whereClause,
    });
  } catch (err) {
    console.error("Database Error in filterProduct:", err);
    throw err;
  }
};

/**
 * Dynamic pagination for products
 */
export const getPaginated = async (skip = 0, take = 10) => {
  try {
    return await prisma.product.findMany({
      skip: Number(skip),
      take: Number(take),
    });
  } catch (err) {
    console.error("Database Error in getPaginated:", err);
    throw err;
  }
};

/**
 * Search products by name (using contains for a looser, more realistic search)
 */
export const searchProduct = async (searchName) => {
  try {
    return await prisma.product.findMany({
      where: {
        name: {
          contains: searchName,
          mode: "insensitive", // Case-insensitive search
        },
      },
    });
  } catch (err) {
    console.error("Database Error in searchProduct:", err);
    throw err;
  }
};

/**
 * Sort products dynamically
 */
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
    console.error(`Database Error in getProductsSorted (${direction}):`, err);
    throw err;
  }
};
