import { z } from "zod";
import type { TFn } from "./types";

export function createChangePasswordFormSchema(t: TFn) {
  return z
    .object({
      oldPassword: z.string().min(6, { message: t("page.setting.validation.passwordMinLength") }),
      newPassword: z.string().min(6, { message: t("page.setting.validation.passwordMinLength") }),
      confirmPassword: z
        .string()
        .min(1, { message: t("page.setting.validation.passwordMinLength") })
        .min(6, { message: t("page.setting.validation.passwordMinLength") }),
    })
    .refine((data) => data.newPassword !== data.oldPassword, {
      path: ["newPassword"],
      message: t("page.setting.validation.newPasswordMustDiffer"),
    })
    .refine((data) => data.confirmPassword === data.newPassword, {
      path: ["confirmPassword"],
      message: t("page.setting.validation.passwordsDoNotMatch"),
    });
}

export type ChangePasswordFormValues = z.infer<ReturnType<typeof createChangePasswordFormSchema>>;
