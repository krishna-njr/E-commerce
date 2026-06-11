export const comparePassword = (inputPassword, storedPassword) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};
