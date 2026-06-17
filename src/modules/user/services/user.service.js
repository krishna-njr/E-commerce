import AppError from "../../../../utils/AppError.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../utils/generateToken.js";
import { hashToken } from "../../../../utils/hash.js";
import { comparePassword, hashPassword } from "../../../../utils/password.js";
import verifyToken from "../../../../utils/verifyToken.js";
import {
  createRefreshToken,
  createUser,
  findRefreshToken,
  findUserByEmail,
  findUserById,
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

// update user details
// Forgot Password
// Reset/Change password

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
