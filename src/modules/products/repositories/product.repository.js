import { prisma } from "../../../../clients/pg-client.js";
import AppError from "../../../../utils/AppError.js";

export const getAllProduct = async () => {
  try {
    return await prisma.product.findMany();
  } catch (err) {
    console.error("Database Error in getAllProduct:", err.message);
    throw new AppError(`Database Error in getAllProduct : ${err.message}`)
  }
};

export const filterProduct = async (conditions) => {
  try {
    return await prisma.product.findMany({
      where: conditions,
    });
  } catch (err) {
    console.error("Database Error in filterProduct:", err.message);
    throw new AppError(`Database Error in filterProduct : ${err.message}`)
  }
};

export const getPaginated = async (skip = 0, take = 10) => {
  try {
    return await prisma.product.findMany({
      skip: skip,
      take: take,
    });
  } catch (err) {
    console.error("Database Error in getPaginated: ", err,message);
    throw new AppError(`Database Error in getPaginated : ${err.message}`)
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
    console.error("Database Error in searchProduct:", err.message);
    throw new AppError(`Database Error in searchProduct : ${err.message}`)
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
    throw new AppError(`Database Error in getProductsSorted : ${err.message}`)
  }
};
