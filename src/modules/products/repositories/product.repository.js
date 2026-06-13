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
    console.error("Interval Server Error :", err.message);
    throw new AppError(`Interval Server Error : ${err.message}`);
  }
};

export const filterProduct = async (conditions) => {
  try {
    return await prisma.product.findMany({
      where: conditions,
    });
  } catch (err) {
    console.error("Internal Server Error : ", err.message);
    throw new AppError(`Internal Server Error : ${err.message}`);
  }
};

export const getPaginated = async (skip = 0, take = 10) => {
  try {
    return await prisma.product.findMany({
      skip: skip,
      take: take,
    });
  } catch (err) {
    console.error("Internal Server Error : ", err.message);
    throw new AppError(`Internal Server Error : ${err.message}`);
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
    console.error("Internal Server Error : ", err.message);
    throw new AppError(`Internal Server Error : ${err.message}`);
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
    console.error(`Internal Server Error : `, err.message);
    throw new AppError(`Internal Server Error : ${err.message}`);
  }
};

export const addProduct = async ({ name, description, price }) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
        data: {
          name: name,
          description: description,
          price: price,
        },
      });
      // we need to add the new Product in inventory also:
      await tx.inventory.create({
        data: {
          productId: createdProduct.id,
          quantity: 1,
        },
      });
      return createdProduct;
    });
  } catch (err) {
    console.error(`Internal Server Error : `, err.message);
    throw new AppError(`Internal Server Error : ${err.message}`);
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
    console.error("Internal Server Error : ", err.message);
    throw new AppError(`Internal Server Error : ${err.message}`);
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
    console.error("Internal Server Error : ", err.message);
    throw new AppError(`Internal Server Error : ${err.message}`);
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
    console.error("Internal Server Error : ", err.message);
    throw new AppError(`Internal Server Error : ${err.message}`);
  }
};
