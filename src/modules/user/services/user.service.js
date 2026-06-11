import AppError from "../../../../utils/AppError.js";
import { generateAccessToken } from "../../../../utils/generateToken.js";
// import { sanitize } from "../../auth/services/auth.service.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

export const registerUserService = async ({
  email,
  password,
  name,
  phoneNumber,
  role,
}) => {
  const userExist = await findUserByEmail(email);

  if (userExist) {
    throw new AppError("Email already Exist", 400);
  }

  const comparePassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    email,
    name,
    phoneNumber,
    role,
    password: hashPassword,
  });

  const { password: _, ...sanitizeUser } = user;

  return sanitizeUser;
};

export const loginUserService = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("User not exist", 400);
  }

  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!passwordCheck) {
    throw new AppError("Unauthorized ", 401);
  }

  const token = generateAccessToken(user);

  const { password: _, ...sanitizeUser } = user;
  return { user: sanitizeUser, token };
};

export const getUserDetailService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("User not exist", 401);
  }

  const { password: _, ...sanitizeUser } = user;
  return { user: sanitizeUser };
};
