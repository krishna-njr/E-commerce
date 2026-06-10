import express from "express";
import { router as authRoutes } from "./modules/auth/route/auth.route.js";
// import userDB from "./modules/shared/userDB.js";
import morgan from "morgan";
import { router as customerProductRoutes } from "./modules/customer/route/customer.route.js";
// import { router as registerRoute } from './modules/auth/register/register.routes.js';
import publicProductRoutes from "./modules/products/route/product.public.route.js";
import sellerProductRoutes from "./modules/products/route/product.seller.route.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

// app.use("/api/v1/product", customerProductRoutes);

app.use("/api/v1/products", publicProductRoutes);

app.use("/api/v1/seller", sellerProductRoutes);

// app.get("/users", (req, res) => {
//   // console.log(userDB);
//   res.send(userDB);
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${statusCode} - ${message}`, err.stack);

  res.status(statusCode).json({
    success: false,
    error: message,
  });
});

export default app;
