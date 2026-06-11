// validateAuthentication
export const authenticateValidation = async (req, res, next) => {
  const authHeader = req.header.authorization;
  const token = req.header.authorization.split(" ")[1];

  if (!authHeader || !token) {
    const error = new Error("Header missing");
    error.statusCode = 401;
    return next(error);
  }

  const decode = jwt.verify(token, process.env.ACCESS_SECRET);

  if (!decode) {
    const error = new Error("Invalid token");
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
      const error = new Error("Forbidden", 401);
      error.statusCode = 403;
      return next(error);
    }

    next();
  };
