import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input } from "@components/shared";
import { resetPassword } from "@services/auth";
import { ResetPasswordFormValues, createResetPasswordSchema } from "./validation";

export const ResetPasswordPage = () => {
  const { token } = useSearch({ from: "/_public/reset-password" });
  const { t } = useTranslation();

  const navigate = useNavigate();

  const resetPasswordSchema = useMemo(() => createResetPasswordSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: ResetPasswordFormValues) =>
      await resetPassword(token, data.newPassword, data.confirmPassword),
    onSuccess: () => navigate({ to: "/auth", search: { mode: "login" } }),
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    mutate(data);
  };

  return (
    <div className="m-auto flex w-[560px] flex-col">
      <h1 className="mb-6 text-34 font-normal leading-11 dark:text-white">
        {t("page.resetPassword.title")}
      </h1>
      <p className="mb-10 leading-6 dark:text-white">{t("page.resetPassword.subtitle")}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-6">
          <Input
            label={t("page.resetPassword.newPasswordLabel")}
            type="password"
            placeholder={t("page.resetPassword.newPasswordLabel")}
            autoComplete="new-password"
            {...register("newPassword")}
            error={errors.newPassword?.message}
          />

          <Input
            label={t("page.resetPassword.confirmPasswordLabel")}
            type="password"
            placeholder={t("page.resetPassword.confirmPasswordLabel")}
            autoComplete="new-password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>

        <div className="mt-13 flex flex-col items-center gap-0">
          <Button className="w-30" variant="filled" type="submit" disabled={!isValid}>
            {t("page.resetPassword.submit")}
          </Button>

          <Link to="/auth" search={{ mode: "login" }}>
            <Button variant="default" type="button">
              {t("page.resetPassword.goSignIn")}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
