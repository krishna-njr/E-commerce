import AppError from "../../../../utils/AppError.js";
import crypto from "crypto";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../utils/generateToken.js";
import { hashToken } from "../../../../utils/hash.js";
import { comparePassword, hashPassword } from "../../../../utils/password.js";
import verifyToken from "../../../../utils/verifyToken.js";
import {
  createRefreshToken,
  createSession,
  createUser,
  deleteSession,
  findRefreshToken,
  findUserByEmail,
  findUserById,
  getSession,
  getUserWithEmailAndPassword,
  revokeRefreshTokensForUser,
  updateUserById,
} from "../repositories/user.repository.js";

export const registerUserService = async ({
  email,
  password,
  fullName,
  phoneNumber,
  role,
}) => {
  const userExist = await findUserByEmail(email);

  if (userExist) {
    throw new AppError("Email already Exist", 409);
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    fullName,
    email,
    phoneNumber,
    role,
    password: hashedPassword,
  });

  return user;
};

// ***************
export const loginUserService = async ({ email, password }) => {
  const user = await getUserWithEmailAndPassword(email);

  if (!user) {
    throw new AppError("User not exist", 400);
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Unauthorized ", 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const hashedRefreshToken = await hashToken(refreshToken);

  const refreshTokenRecord = await createRefreshToken({
    tokenHash: hashedRefreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
  });
  // console.log("Refresh token record created: ", refreshTokenRecord);
  // console.log('inside loginUserService : ', user);
  const { password: _, ...sanitizeUser } = user;
  return { user: sanitizeUser, accessToken, refreshToken };
};

export const getUserDetailService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("User not exist", 401);
  }
  return user;
};

export const updateUserDetailService = async (userDetails) => {
  const userId = userDetails.id;
  if (!userId) {
    throw new AppError("Id Required", 400);
  }

  const updatedUser = await updateUserById({ userId, userDetails });
  if (!updatedUser) {
    throw new AppError("User not exist", 401);
  }
  return updatedUser;
};

// ! Refresh Token Logic

export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Invalid Credentials", 400);
  }
  let payload;
  try {
    payload = await verifyToken(refreshToken, "refresh");
  } catch (error) {
    throw new AppError("Invalid Credentials", 400);
  }

  const tokenHash = await hashToken(refreshToken);

  const storedToken = await findRefreshToken(tokenHash);

  if (!storedToken) {
    throw new AppError("Invalid Credentials", 400);
  }

  if (storedToken.expiresAt < new Date()) {
    throw new AppError("Refresh Token Expired", 400);
  }

  // rotate token :
  const newAccessToken = generateAccessToken(storedToken.user);
  const newRefreshToken = generateRefreshToken(storedToken.user);

  await revokeRefreshTokensForUser(tokenHash);

  const newTokenHash = await hashToken(newRefreshToken);
  await createRefreshToken({
    tokenHash: newTokenHash,
    userId: storedToken.userId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logoutService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Invalid Credentials", 400);
  }
  const tokenHash = await hashToken(refreshToken);
  // console.log("Token hash to revoke : ", tokenHash);
  await revokeRefreshTokensForUser(tokenHash);

  return true;
};

// ************************** session-redis ****************************

export const sessionBasedLoginService = async ({ email, password }) => {
  const user = await getUserWithEmailAndPassword(email);

  if (!user) {
    throw new AppError("Unauthorized", 400);
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Unauthorized ", 401);
  }

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  const deviceId = crypto.randomUUID();

  await createSession({
    userId: user.id,
    deviceId,
    refreshTokenHash: hashToken(refreshToken),
  });

  return { accessToken, refreshToken, deviceId };
};

export const sessionBasedRefreshService = async (refreshToken, deviceId) => {
  const payload = verifyToken(refreshToken, "refresh");

  const userId = payload.userId;

  const key = `session:${userId}:${deviceId}`;

  const sessionExistence = await getSession(userId, deviceId);

  if (!sessionExistence) {
    throw new AppError(`Session not found (logged out or expired)`);
  }

  const session = JSON.parse(sessionExistence);

  if (session.refreshTokenHash !== hashToken(refreshToken)) {
    throw new AppError(`Refresh token mismatch`);
  }

  // rotate tokens
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // update session
  const sessionData = {
    userId,
    deviceId,
    refreshTokenHash: hashToken(newRefreshToken),
  };

  await createSession(sessionData);

  return {
    accessTokena: newAccessToken,
    refreshToken: newRefreshToken,
    deviceId: deviceId,
  };
};

export const sessionBasedLogoutSession = async (userId, deviceId) => {
  await deleteSession(userId, deviceId);
};
