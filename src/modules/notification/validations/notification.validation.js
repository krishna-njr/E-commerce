import z from "zod";

export const createNotificationSchema = z.object({
  body: z.object({
    topic: z
      .string()
      .min(1, "Topic is required")
      .max(100, "Topic is too long")
      .trim(),

    message: z
      .string()
      .min(1, "Message is required")
      .max(1000, "Message is too long")
      .trim(),
  }),
});

export const getNotificationsSchema = z.object({
  query: z.object({}).strict().optional(),
});

export const markAsReadSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid notification ID format"),
  }),
});

export const deleteNotificationSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid notification ID format"),
  }),
});
