import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input } from "@components/shared";
import { AuthFormProps } from "./types";
import { createAuthFormSchema, type AuthFormValues } from "./validation";

export const AuthForm = ({ onSubmit, label, isSignup = false }: AuthFormProps) => {
  const { t } = useTranslation();
  const validationSchema = createAuthFormSchema(isSignup);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const handleFormSubmit = ({ email, password }: AuthFormValues) => {
    onSubmit({ email, password });
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-5.5"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input
        type="email"
        label={t("page.users.email")}
        placeholder={t("page.users.email")}
        {...register("email")}
        autoComplete="email"
        error={errors.email?.message}
        className="rounded-none"
      />
      <Input
        type="password"
        label={t("page.users.password")}
        placeholder={t("page.users.password")}
        autoComplete={isSignup ? "new-password" : "current-password"}
        {...register("password")}
        error={errors.password?.message}
        className="rounded-none"
      />
      {isSignup && (
        <Input
          type="password"
          label={t("page.setting.confirmPassword")}
          placeholder={t("page.setting.confirmPassword")}
          autoComplete="new-password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          className="rounded-none"
        />
      )}
      <Button type="submit" variant="filled" className="w-40 mb-2 rounded-40!">
        {label}
      </Button>
    </form>
  );
};
