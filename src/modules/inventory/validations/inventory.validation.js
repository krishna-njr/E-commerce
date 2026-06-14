import { z } from "zod";

const uuidSchema = z.string().uuid("Invalid product ID format");

const quantitySchema = z.coerce
  .number()
  .int("Quantity must be an integer")
  .min(0, "Quantity cannot be negative");

export const createInventorySchema = z.object({
  body: z.object({
    productId: uuidSchema,
    quantity: quantitySchema,
  }),
});

export const getInventoryByProductIdSchema = z.object({
  params: z.object({
    id: uuidSchema,
  }),
});

export const updateInventorySchema = z.object({
  params: z.object({
    id: uuidSchema,
  }),
  query: z.object({
    quantity: quantitySchema,
  }),
});
