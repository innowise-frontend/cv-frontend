import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  createChangePasswordFormSchema,
  type ChangePasswordFormValues,
} from "@root/components/ChangePassword/validation";
import { LOCAL_STORAGE_KEYS } from "@root/constants/localStorage";
import { cn, getErrorToastMessage } from "@root/lib";
import { changePassword } from "@services/auth";
import { Input, Button } from "../shared";
import type { ChangePasswordProps } from "./types";

export const ChangePassword = ({ className }: ChangePasswordProps) => {
  const { t } = useTranslation();
  const changePasswordFormSchema = createChangePasswordFormSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: ChangePasswordFormValues) => {
      const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)!);

      if (!token) {
        throw new Error(t("page.setting.changePasswordError"));
      }

      await changePassword(token, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
    },
    onSuccess: () => {
      reset();
      toast.success(t("page.setting.changePasswordSuccess"));
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    mutate(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <p className="text-left leading-6">{t("page.setting.changePassword")}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          type="password"
          label={t("page.setting.oldPassword")}
          placeholder={t("page.setting.oldPassword")}
          {...register("oldPassword")}
          error={errors.oldPassword?.message}
          onChange={(e) => {
            clearErrors("oldPassword");
            register("oldPassword").onChange(e);
          }}
        />
        <Input
          type="password"
          label={t("page.setting.newPassword")}
          placeholder={t("page.setting.newPassword")}
          {...register("newPassword")}
          error={errors.newPassword?.message}
          onChange={(e) => {
            clearErrors("newPassword");
            register("newPassword").onChange(e);
          }}
        />
        <Input
          type="password"
          label={t("page.setting.confirmPassword")}
          placeholder={t("page.setting.confirmPassword")}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          onChange={(e) => {
            clearErrors("confirmPassword");
            register("confirmPassword").onChange(e);
          }}
        />
        <Button variant="filled" className="w-40 self-end" type="submit" disabled={!isValid}>
          {t("page.setting.changePasswordButton")}
        </Button>
      </form>
    </div>
  );
};
