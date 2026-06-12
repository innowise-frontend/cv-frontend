import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input } from "@components/shared";
import { AuthFormProps } from "./types";
import { AuthFormValues, createAuthFormSchema, getAuthFormFieldErrors } from "./validation";

const defaultValues: AuthFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const AuthForm = ({ label, isSignup, onSubmit }: AuthFormProps) => {
  const { t } = useTranslation();
  const validationSchema = createAuthFormSchema(isSignup);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof AuthFormValues, string>>>({});

  const { register, handleSubmit } = useForm<AuthFormValues>({
    defaultValues,
  });

  return (
    <form
      className="flex flex-col justify-center items-center gap-5.5"
      noValidate
      onSubmit={handleSubmit((data) => {
        const result = validationSchema.safeParse(data);

        if (!result.success) {
          setFieldErrors(getAuthFormFieldErrors(result.error));

          return;
        }

        setFieldErrors({});
        onSubmit(result.data);
      })}
    >
      <Input
        type="text"
        inputMode="email"
        label={t("page.users.email")}
        placeholder={t("page.users.email")}
        {...register("email")}
        autoComplete="email"
        error={fieldErrors.email}
        className="rounded-none"
      />
      <Input
        type="password"
        label={t("page.users.password")}
        placeholder={t("page.users.password")}
        autoComplete={isSignup ? "new-password" : "current-password"}
        {...register("password")}
        error={fieldErrors.password}
        className="rounded-none"
      />
      {isSignup && (
        <Input
          type="password"
          label={t("page.setting.confirmPassword")}
          placeholder={t("page.setting.confirmPassword")}
          autoComplete="new-password"
          {...register("confirmPassword")}
          error={fieldErrors.confirmPassword}
          className="rounded-none"
        />
      )}
      <Button type="submit" variant="filled" className="w-40 mb-2 rounded-40!">
        {label}
      </Button>
    </form>
  );
};
