import { z } from "zod";

const emailSchema = z.string().email("Invalid email format");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(15, "Password too long");

const uuidSchema = z.string().uuid("Invalid user id format");

export const registerUserSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
    fullName: z.string().min(2).max(20),
    phoneNumber: z
      .string()
      .min(10, "Phone number too short")
      .max(15, "Phone number too long")
      .optional(),

    role: z.enum(["CUSTOMER", "ADMIN", "SELLER"]).optional(),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(6, "Password is required"),
  }),
});

// export const getUserSchema = z.object({
//   user: z.object({
//     id: uuidSchema,
//   }),
// });
