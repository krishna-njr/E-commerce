import express, { application } from "express";
import morgan from "morgan";
import { router as authRoutes } from "./modules/auth/route/auth.route.js";
import { router as userRoutes } from "./modules/user/route/user.route.js";
import { router as publicProductRoutes } from "./modules/products/route/product.public.route.js";
import { router as sellerProductRoutes } from "./modules/products/route/product.seller.route.js";
import { router as orderRoutes } from "./modules/orders/route/order.route.js";
import globalErrorMiddleware from "./shared/globalError.middleware.js";
import { router as addressRoutes } from "./modules/address/route/address.route.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/products", publicProductRoutes, sellerProductRoutes);

app.use('/api/v1/orders', orderRoutes);

app.use('/api/v1/addresses', addressRoutes);

app.use(globalErrorMiddleware);

export default app;
