import z from "zod";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Minimum length required is 2"}).max(8, {message : "maximum length required is 8"}), 
  email: z.email({message: "email is required"}), 
  password: z.number().min(5, {message: 'Minimum length required is 5'}).max(12, {message: "Maximum length required is 12"})
})

const loginSchema = registerSchema.pick({email: true, password: true}); 

export { registerSchema, loginSchema }; 