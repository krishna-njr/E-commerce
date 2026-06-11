import express from "express";
import { router as authRoutes } from "./modules/auth/route/auth.route.js";
import { router as userRoutes } from "./modules/user/route/user.route.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/user", userRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${statusCode} - ${message}`, err.stack);

  res.status(statusCode).json({
    success: false,
    message: message,
  });
});

export default app;
