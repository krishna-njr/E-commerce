import z from "zod";

export const createDeliverySchema = z
  .object({
    body: z.object({
      orderId: z.string().uuid("Invalid order ID format"),
      addressId: z.string().uuid("Invalid address ID format"),
      arrivalDate: z.string().optional(),
    }),
  })
  .strip();

export const getDeliveryByIdSchema = z
  .object({
    params: z.object({
      id: z.string().uuid("Invalid delivery ID format"),
    }),
  })
  .strip();

export const updateDeliverySchema = z
  .object({
    params: z.object({
      id: z.string().uuid("Invalid delivery ID format"),
    }),
    body: z.object({
      // it should take address to update through transaction.
      arrivalDate: z.string().optional(),
    }),
  })
  .strip();

export const updateDeliveryStatusSchema = z
  .object({
    params: z.object({
      id: z.string().uuid("Invalid delivery ID format"),
    }),
    query: z.object({
      status: z.enum(["PENDING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]),
    }),
  })
  .strip();
