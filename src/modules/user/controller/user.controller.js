import { asyncWrapper } from "../../../../utils/asyncWrapper.js";
import successResponse from "../../../../utils/responseHelper.js";
import {
  getUserDetailService,
  loginUserService,
  logoutService,
  refreshTokenService,
  registerUserService,
  sessionBasedLoginService,
  sessionBasedLogoutSession,
  sessionBasedRefreshService,
} from "../services/user.service.js";

export const registerUserController = asyncWrapper(async (req, res) => {
  const userDetails = req.body;

  const user = await registerUserService(userDetails);

  successResponse(res, user, "User created successfully", 201);
});

export const loginUserController = asyncWrapper(async (req, res) => {
  // const { user, accessToken, refreshToken } = await loginUserService(req.body);

  const { accessToken, refreshToken, deviceId } =
    await sessionBasedLoginService(req.body);

  successResponse(
    res,
    { accessToken, refreshToken, deviceId },
    "Successfully login",
    200,
  );
});

export const getUserController = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const user = await getUserDetailService(userId);

  successResponse(res, user, "User details retrieved successfully", 200);
});

// ! Token Refresh and Logout Controllers
export const refreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    // const tokens = await refreshTokenService(refreshToken);
    const tokens = await sessionBasedRefreshService(refreshToken);

    successResponse(res, tokens, "Token refreshed successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    await logoutService(refreshToken);

    await sessionBasedLogoutSession(refreshToken);

    successResponse(res, null, "Logged out successfully", 200);
  } catch (error) {
    next(error);
  }
};
