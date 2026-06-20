import { prisma } from "../../../../clients/prisma.client.js";
import redisClient from "../../../../clients/redis.client.js";
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
    throw new AppError(`Internal server error: ${err.message}`, 500);
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
    throw new AppError(`Internal server error: ${err.message}`, 500);
  }
};

export const getUserWithEmailAndPassword = async (email) => {
  try {
    const user = prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (err) {
    throw new AppError(`Internal server error: ${err.message}`, 500);
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
    throw new AppError(`Internal server error: ${err.message}`, 500);
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
    throw new AppError(`Internal server error: ${err.message}`, 500);
  }
};

// ! Revoke Refresh Tokens.
export const createRefreshToken = async ({ userId, tokenHash, expiresAt }) => {
  try {
    const refreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
    return refreshToken;
  } catch (error) {
    throw new AppError(`Internal server error: ${error.message}`, 500);
  }
};

export const findRefreshToken = async (tokenHash) => {
  try {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: {
        user: true,
      },
    });
    return refreshToken;
  } catch (error) {
    throw new AppError(`Internal server error: ${error.message}`, 500);
  }
};

export const revokeRefreshTokensForUser = async (tokenHash) => {
  try {
    const token = await prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
    if (!token) {
      throw new AppError("Refresh token not found", 401);
    }
    if (token.isRevoked) {
      throw new AppError("Refresh token already revoked", 400);
    }
    const revokedTokens = await prisma.refreshToken.update({
      where: { tokenHash },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
      },
    });
    return revokedTokens;
  } catch (error) {
    throw new AppError(`Internal server error: ${error.message}`, 500);
  }
};

export const revokeAllRefreshTokensForUser = async (userId) => {
  try {
    const revokedTokens = await prisma.refreshToken.updateMany({
      where: { userId },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
      },
    });
    return revokedTokens;
  } catch (error) {
    throw new AppError(`Internal server error: ${error.message}`, 500);
  }
};

// ***************************** redis session ***************************

export const createSession = async ({ userId, deviceId, refreshTokenHash }) => {
  try {
    const key = `session:${userId}:${deviceId}`;

    console.log(`key`, key);

    const sessionData = {
      userId,
      deviceId,
      refreshTokenHash,
      createdAt: Date.now(),
    };
    // console.log(`Inside create session :`, sessionData);
    const created = await redisClient.set(
      key,
      JSON.stringify(sessionData),
      "EX",
      7 * 24 * 60 * 60,
    );

    if (created != "OK") {
      throw new AppError(`Internal server error`, 500);
    }
  } catch (error) {
    console.log(`Inside create session : ${error.message}`);
    throw new AppError(`Internal server error`, 500);
  }
};

export const getSession = async (userId, deviceId) => {
  try {
    const key = `session:${userId}:${deviceId}`;

    const sessionData = await redisClient.get(key);

    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.log(`Inside get session : ${error.message}`);
    throw new AppError(`Internal server error`, 500);
  }
};

export const deleteSession = async (userId, deviceId) => {
  try {
    const key = `session:${userId}:${deviceId}`;

    const deletedKey = await redisClient.del(key);
  } catch (error) {
    console.log(`Inside delete session : ${error.message}`);
    throw new AppError(`Internal server error`, 500);
  }
};
