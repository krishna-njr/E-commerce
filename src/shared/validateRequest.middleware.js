import { parseAsync, ZodError } from "zod";
import AppError from "../../utils/AppError.js";

const validateRequest = (schema) => async (req, res, next) => {
  try {
    const parsedData = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (parsedData.body) req.body = parsedData.body;
    // if (parsedData.query) req.query = parsedData.query;
    // if (parsedData.params) req.params = parsedData.params;

    // console.log("Validation successful", parsedData);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next(
        new AppError(
          error.issues.map((issue) => issue.message).join(", "),
          400,
        ),
      );
    }

    next(error);
  }
};

export default validateRequest;
