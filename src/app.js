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
import { router as notificationRoutes } from "./modules/notification/route/notification.route.js";
import errorHandler from "./shared/errorHandler.middleware.js";
// import limiter from "../utils/rateLimit.js";
import redisClient from "../clients/redis.client.js";
import { prisma } from "../clients/prisma.client.js";
import rateLimit from "../utils/rateLimit.js";
import { rateLimitMiddleware } from "../utils/limit.middleware.js";
import { connectToRabbitMQ } from "./shared/rabbitmq/connection.js";
import consumeEmail from "./modules/notification/consumer/email.consumer.js";

await connectToRabbitMQ();

consumeEmail();
const app = express();

// const limiter = await rateLimit(app, redisClient);

app.use(express.json());

app.use(morgan("dev"));

// app.use(rateLimit);

app.use(
  "/api/v1/users",
  rateLimitMiddleware({ limit: 4, window: 60 }),
  userRoutes,
);

app.use("/api/v1/products", publicProductRoutes);

app.use("/api/v1/products/seller", sellerProductRoutes);

app.use("/api/v1/orders", orderRoutes);

app.use("/api/v1/addresses", addressRoutes);

app.use("/api/v1/cart", cartRoutes);

app.use("/api/v1/inventory", inventoryRoutes);

app.use("/api/v1/deliveries", deliveryRoutes);

app.use("/api/v1/notifications", notificationRoutes);

app.use(errorHandler);

export default app;
