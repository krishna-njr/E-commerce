import z from "zod";

const uuidSchema = z.string().uuid("Invalid UUID format");

const quantitySchema = z.number().min(1, "Quantity must be a positive integer");

export const addToCartSchema = z.object({
  params: z.object({
    itemId: uuidSchema,
  }),
  body: z.object({
    quantity: quantitySchema,
  }),
});

export const updateCartItemSchema = z.object({
  params: z.object({
    itemId: uuidSchema,
  }),
  query: z.object({
    quantity: quantitySchema,
  }),
});

export const removeFromCartSchema = z.object({
  params: z.object({
    itemId: uuidSchema,
  }),
});
