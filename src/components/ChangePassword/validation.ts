import { z } from "zod";
import type { TFn } from "./types";

export function createChangePasswordFormSchema(t: TFn) {
  return z.object({
    oldPassword: z
      .string()
      .min(6, { message: t("page.setting.validation.currentPasswordRequired") }),
    newPassword: z.string().min(6, { message: t("page.setting.validation.passwordMinLength") }),
    confirmPassword: z
      .string()
      .min(6, { message: t("page.setting.validation.passwordsDoNotMatch") }),
  });
}

export type ChangePasswordFormValues = z.infer<ReturnType<typeof createChangePasswordFormSchema>>;
