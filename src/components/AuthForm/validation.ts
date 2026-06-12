import { z, type ZodError } from "zod";

const emailField = z
  .string()
  .min(1, { message: "Please enter an email address" })
  .email({ message: "Invalid email address" })
  .transform((val) => val.trim());

const passwordField = z
  .string()
  .min(1, { message: "Please enter a password" })
  .min(6, { message: "Password must be at least 6 characters long" })
  .transform((val) => val.trim());

export const authFormSchema = z.object({
  email: emailField,
  password: passwordField,
  confirmPassword: z
    .string()
    .transform((val) => val.trim())
    .optional(),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;

export const createAuthFormSchema = (isSignup?: boolean) =>
  authFormSchema.superRefine((data, ctx) => {
    if (!isSignup) return;

    const confirmPassword = data.confirmPassword ?? "";

    if (!confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Please confirm your password",
      });

      return;
    }

    if (data.password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

export const formSchema = createAuthFormSchema(false);

export const getAuthFormFieldErrors = (
  error: ZodError,
): Partial<Record<keyof AuthFormValues, string>> => {
  const fieldErrors: Partial<Record<keyof AuthFormValues, string>> = {};

  for (const issue of error.issues) {
    const key = issue.path[0] as keyof AuthFormValues | undefined;

    if (key && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }

  return fieldErrors;
};
