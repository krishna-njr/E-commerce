import { asyncWrapper } from "../../../../utils/asyncWrapper.js";
import {
  getUserDetailService,
  loginUserService,
  registerUserService,
} from "../services/user.service.js";

export const registerUserController = asyncWrapper(async (req, res) => {
  const user = await registerUserService(req.body);

  return res.status(201).json({
    status: true,
    message: "User is created",
    user: user, // sanitize user
  });
});

export const loginUserController = asyncWrapper(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginUserService(req.body);

  return res.status(200).json({
    status: true,
    message: "Sucessfully login",
    data: {
      user: user, // sanitize user
      token: {
        accessToken,
        refreshToken,
      },
    },
  });
});

export const getUserController = asyncWrapper(async (req, res) => {
  const user = await getUserDetailService(req.body);

  return res.status(200).json({
    status: true,
    message: "Successfully fetched user",
    user: user, // sanitize user
  });
});

// getUsers();
// getUserById();
// updateUser();
// deleteUser();
// updateUserRole();
