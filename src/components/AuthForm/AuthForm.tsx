import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input } from "@components/shared";
import { AuthFormProps } from "./types";
import { formSchema, type FormSchema } from "./validation";

export const AuthForm = ({ onSubmit, label }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const { t } = useTranslation();

  return (
    <form
      className="flex flex-col justify-center items-center gap-6"
      onSubmit={handleSubmit(onSubmit)}
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
        autoComplete="current-password"
        {...register("password")}
        error={errors.password?.message}
        className="rounded-none"
      />
      <Button type="submit" variant="filled" className="w-40 mb-2 rounded-40!">
        {label}
      </Button>
    </form>
  );
};
