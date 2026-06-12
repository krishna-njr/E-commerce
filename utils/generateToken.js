import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  const { id, role } = user;

  return jwt.sign({ id, role }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRES_IN || "15m",
  });
};

export const generateRefreshToken = (user) => {
  const { id, role } = user;

  return jwt.sign({ id, role }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN || "7d",
  });
};
