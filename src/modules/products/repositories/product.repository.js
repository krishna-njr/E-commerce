import { prisma } from "../../../../clients/pg-client.js";
import AppError from "../../../../utils/AppError.js";
import { createProductInInventoryWithTx } from "../../inventory/repositories/inventory.repository.js";

export const getAllProduct = async (sellerId, limit = 10) => {
  try {
    const products = await prisma.product.findMany({
      // ! need to creat sellerId in product table.
      // whered
      take: limit,
    });
    // console.log("Products retrieved from database:", products);
    return products;
  } catch (err) {
    console.error("Interval Server Error :", err.message);
    throw new AppError(`Interval Server Error : ${err.message}`);
  }
};

export const getProductsByFilter = async (filters) => {
  try {
    // const { page = 1, limit = 10, sortBy, order = "asc", ...filters } = query;

    // const where = {};

    // Object.entries(filters).forEach(([key, value]) => {
    //   if (value !== undefined && value !== "") {
    //     where[key] = value;
    //   }
    // });

    // return prisma.product.findMany({
    //   where,
    //   orderBy: sortBy
    //     ? {
    //         [sortBy]: order,
    //       }
    //     : undefined,
    //   skip: (Number(page) - 1) * Number(limit),
    //   take: Number(limit),
    // });
    if (filters.price) {
      filters.price = Number(filters.price);
    }
    const filteredProducts = await prisma.product.findMany({
      where: filters,
    });
    return filteredProducts;
  } catch (err) {
    console.error("Internal Server Error : ", err.message);
    throw new AppError(`Internal Server Error : ${err.message}`);
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
      // add product in inventory.
      await createProductInInventoryWithTx(createdProduct.id, tx);

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
