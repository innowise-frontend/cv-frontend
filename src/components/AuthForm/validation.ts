import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter an email address" })
    .email({ message: "Invalid email address" })
    .transform((val) => val.trim()),
  password: z
    .string()
    .min(1, { message: "Please enter a password" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .transform((val) => val.trim()),
});

export type FormSchema = z.infer<typeof formSchema>;
