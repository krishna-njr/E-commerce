import { prisma } from "../../../../clients/prisma.client.js";
import AppError from "../../../../utils/AppError.js";

export const findUserById = async (userId) => {
  try {
    const user = prisma.user.findUnique({
      where: { id: userId },
      omit: {
        password: true,
      },
    });

    return user;
  } catch (err) {
    throw new Error("Database error in findUserById ", err.message);
  }
};

export const findUserByEmail = async (email) => {
  try {
    const user = prisma.user.findUnique({
      where: { email },
      omit: {
        password: true,
      },
    });

    return user;
  } catch (err) {
    throw new Error("Database error in findUserByEmail ", err.message);
  }
};

export const getUserWithEmailAndPassword = async (email) => {
  try {
    const user = prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (err) {
    throw new Error(
      "Database error in getUserWithEmailAndPassword ",
      err.message,
    );
  }
};

export const createUser = async (userData) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          ...userData,
          // status: 'ACTIVE', // for now setting it default to 'active'
        },
        omit: {
          password: true,
        },
      });

      await tx.cart.create({
        data: {
          userId: user.id,
        },
      });

      return user;
    });
  } catch (err) {
    console.log(err.message);
    throw new Error(`Database error in creating user : ${err.message}`);
  }
};

export const updateUserById = async ({ userId, userDetails }) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...userDetails,
      },
    });

    return updatedUser;
  } catch (err) {
    throw new AppError(`Database error in updating user ${err.message}`, 500);
  }
};
