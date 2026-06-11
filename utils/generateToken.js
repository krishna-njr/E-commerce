import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  const { name, email } = user;

  return jwt.sign({ name, email }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRES_IN || "15m",
  });
};

export const generateRefreshToken = (user) => {
  const { name, email } = user;

  return jwt.sign({ name, email }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN || "7d",
  });
};
