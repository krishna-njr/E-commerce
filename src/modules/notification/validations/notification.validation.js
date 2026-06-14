import z from "zod";

const createNotificationSchema = z.object({
  body: {
    title: z.string().min(1, "Title is required").trim(),
    message: z.string().min(1, "Message is required").trim(),
  },
});

export { createNotificationSchema };
