// validateAuthentication
export const validateAuthentication = async (req, res, next) => {
  const authHeader = req.header.authorization;
  const token = authHeader.split(" ")[1];

  if (!authHeader || !token) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    return next(error);
  } 

  let decode;
  try {
    decode = jwt.verify(token, process.env.ACCESS_SECRET);
  } catch (err) {
    const error = new Error("Invalid token");
    error.statusCode = 401;
    return next(error);
  }

  if (!decode) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next(error);
  }

  req.user = decode; // mounting id and role into the req object
  next();
};

export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
