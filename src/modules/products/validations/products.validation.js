import { z } from "zod";

const uuidSchema = z.string().uuid("Invalid ID format");

export const getSellerProductsSchema = z.object({
  query: z.object({
    limit: z.coerce.number().int().positive().max(100).optional(),
  }),
});

export const getProductsFilteredSchema = z.object({
  query: z.object({
    id: z.string().uuid("Invalid product ID format").optional(),
    name: z.string().trim().optional(),
    price: z.coerce.number().positive().optional(),
    description: z.string().optional(),
  }),
});

export const addProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(255),
    description: z.string().optional(),
    price: z.coerce.number().positive(),
  }),
});

export const getProductSchema = z.object({
  params: z.object({
    id: uuidSchema,
  }),
});

export const deleteProductSchema = z.object({
  params: z.object({
    id: uuidSchema,
  }),
});

export const editProductSchema = z.object({
  params: z.object({
    id: uuidSchema,
  }),
  body: z
    .object({
      name: z.string().min(2).max(255).optional(),
      description: z.string().optional(),
      price: z.coerce.number().positive().optional(),
    })
    .refine(
      (data) => Object.keys(data).length > 0,
      "At least one field must be provided for update",
    ),
});
