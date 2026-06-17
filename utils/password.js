import bcrypt from "bcrypt";
import { hash } from "./hash.js";

export const comparePassword = (inputPassword, storedPassword) => {
  return bcrypt.compareSync(inputPassword, storedPassword);
};

export const hashPassword = (password) => {
  return hash(password);
};
