import "dotenv/config";
import express, { application } from "express";
import morgan from "morgan";
import { router as authRoutes } from "./modules/auth/route/auth.route.js";
import { router as userRoutes } from "./modules/user/route/user.route.js";
import { router as publicProductRoutes } from "./modules/products/route/product.public.route.js";
import { router as sellerProductRoutes } from "./modules/products/route/product.seller.route.js";
import { router as orderRoutes } from "./modules/orders/route/order.route.js";
import { router as addressRoutes } from "./modules/address/route/address.route.js";
import { router as cartRoutes } from "./modules/cart/route/cart.route.js";
import { router as inventoryRoutes } from "./modules/inventory/route/inventory.route.js";
import { router as deliveryRoutes } from "./modules/delivery/route/delivery.route.js";
// import errorHandler from "./shared/errorHandler.middleware.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/products", publicProductRoutes, sellerProductRoutes);

app.use("/api/v1/orders", orderRoutes);

app.use("/api/v1/addresses", addressRoutes);

app.use("/api/v1/cart", cartRoutes);

app.use("/api/v1/inventory", inventoryRoutes);

// app.use("/api/v1/deliveries", deliveryRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    message: message,
  });
});

export default app;
