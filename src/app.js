import express, { application } from "express";
import morgan from "morgan";
import { router as authRoutes } from "./modules/auth/route/auth.route.js";
import { router as userRoutes } from "./modules/user/route/user.route.js";
import { router as publicProductRoutes } from "./modules/products/route/product.public.route.js";
import { router as sellerProductRoutes } from "./modules/products/route/product.seller.route.js";
import { router as orderRoutes } from "./modules/orders/route/order.route.js";
const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/products", publicProductRoutes, sellerProductRoutes);

app.use('/api/v1/orders', orderRoutes);

// app.all('/test', (req, res) => {
//   console.log(req.body);
// })

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
