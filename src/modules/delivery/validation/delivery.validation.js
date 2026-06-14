import z from "zod";

export const createDeliverySchema = z.object({
  body: z.object({
    orderId: z.string().uuid(),
    addressId: z.string().uuid(),
    arrivalDate: z.string().optional(),
  }),
});

export const getDeliveryByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const updateDeliverySchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    // it should take address to update through transaction.
    arrivalDate: z.string().optional(),
  }),
});

export const updateDeliveryStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(["PENDING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]),
  }),
});
