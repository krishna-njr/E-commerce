import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  const { id, role } = user;

  return jwt.sign({ id, role }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m",
  });
};

export const generateRefreshToken = (user) => {
  const { id, role } = user;

  return jwt.sign({ id, role }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d",
  });
};
