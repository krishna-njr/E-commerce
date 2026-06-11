import { prisma } from "../../../../clients/pg-client.js";

export const getAllProduct = async () => {
  try {
    return await prisma.product.findMany();
  } catch (err) {
    console.error("Database Error in getAllProduct:", err);
    throw err;
  }
};

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

export const getPaginated = async (skip = 0, take = 10) => {
  try {
    return await prisma.product.findMany({
      skip: skip,
      take: take,
    });
  } catch (err) {
    console.error("Database Error in getPaginated:", err);
    throw err;
  }
};

export const searchProduct = async (searchName) => {
  try {
    return await prisma.product.findMany({
      where: {
        name: {
          contains: searchName,
        },
      },
    });
  } catch (err) {
    console.error("Database Error in searchProduct:", err);
    throw err;
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
    console.error(`Database Error in getProductsSorted (${direction}):`, err);
    throw err;
  }
};
