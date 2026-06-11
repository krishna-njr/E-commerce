import AppError from "../../../../utils/AppError.js";
import { generateAccessToken } from "../../../../utils/generateToken.js";
import { comparePassword, hashPassword } from "../../../../utils/password.js";
// import { sanitize } from "../../auth/services/auth.service.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/user.repository.js";

export const registerUserService = async ({
  email,
  password,
  name,
  phoneNumber,
  role,
}) => {
  const userExist = await findUserByEmail(email);
  // console.log(userExist);
  
  if (userExist) {
    throw new AppError("Email already Exist", 400);
  }

  const hashedPassword = await hashPassword(password);

  // let hashedPassword = '345fgh4o34567'; 
  console.log('inside registerUserServices ', hashedPassword);
  

  const user = await createUser({
    email,
    name,
    phoneNumber,
    role,
    password: hashedPassword,
  });

  const { password: _, ...sanitizeUser } = user;

  return sanitizeUser;
};

// ***************
export const loginUserService = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("User not exist", 400);
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
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
