import bcrypt from "bcrypt";

export const comparePassword = (inputPassword, storedPassword) => {
  return bcrypt.compareSync(inputPassword, storedPassword);
};

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
