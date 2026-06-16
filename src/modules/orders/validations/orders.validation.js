import { z } from "zod";
import { id } from "zod/locales";

const uuidSchema = z.string().uuid("Invalid UUID format");

export const createOrderSchema = z.object({
  params: z.object({
    id: uuidSchema,
  }),
});

export const getOrderByIdSchema = createOrderSchema;

export const updateOrderStatusSchema = z.object({
  params: z.object({
    id: uuidSchema,
  }),
  query: z.object({
    status: z.enum([
      "PENDING",
      "CONFIRMED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ]),
  }),
});

export const updatePaymentStatusSchema = z.object({
  params: z.object({
    id: uuidSchema,
  }),

  query: z.object({
    status: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]),
  }),
});

export const cancelOrderSchema = z.object({
  params: z.object({
    id: uuidSchema,
  }),
});
