import AppError from "../../../../utils/AppError.js";
import { generateAccessToken, generateRefreshToken } from "../../../../utils/generateToken.js";
import { comparePassword, hashPassword } from "../../../../utils/password.js";
// import { sanitize } from "../../auth/services/auth.service.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  getUserWithEmailAndPassword,
  updateUserById,
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
    throw new AppError("Email already Exist", 409);
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
