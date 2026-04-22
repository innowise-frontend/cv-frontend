import { z } from "zod";

type TFn = (key: string) => string;

export function createResetPasswordSchema(t: TFn) {
  return z
    .object({
      newPassword: z
        .string()
        .min(6, { message: t("page.resetPassword.validation.passwordMinLength") }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("page.resetPassword.validation.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });
}

export type ResetPasswordFormValues = z.infer<ReturnType<typeof createResetPasswordSchema>>;
