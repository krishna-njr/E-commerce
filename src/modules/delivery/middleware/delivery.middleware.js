import {
  validateAuthentication,
  authorize,
} from "../../user/middleware/user.middleware.js";

const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    next(new AppError(`Validation Error: ${error.message}`, 400));
  }
};

export { validateAuthentication, authorize, validateRequest };
