import { z } from "zod";
import { createToJSONSchemaMethod } from "zod/v4/core";

export const createAddressSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, "Full name is required").max(20),

    street: z.string().min(1, "Street is required").max(50),

    city: z.string().min(1, "City is required").max(30),

    state: z.string().min(1, "State is required").max(30),

    postalCode: z.string().min(3, "Postal code is required").max(20),

    country: z.string().min(1, "Country is required").max(30),

    phoneNumber: z
      .string()
      .min(10, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^[0-9+\-\s]+$/, "Invalid phone number format"),
  }),
});

const addressIdParam = z.object({
  params: z.object({
    id: z.string().uuid("Invalid address ID format"),
  }),
});

export const getAddressByIdSchema = addressIdParam;

export const deleteAddressSchema = addressIdParam;

export const updateAddressSchema = z.object({
  ...addressIdParam.shape,
  ...createAddressSchema.shape.body.partial(), // optional fields for update
});
