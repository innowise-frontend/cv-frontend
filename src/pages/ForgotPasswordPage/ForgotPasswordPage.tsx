import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button, Input } from "@components/shared";
import { getErrorToastMessage } from "@root/lib";
import { forgotPassword } from "@services/auth";

type FormValues = {
  email: string;
};

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const emailValue = useWatch({ control, name: "email" });

  const { mutate } = useMutation({
    mutationFn: (data: FormValues) => forgotPassword(data.email),
    onSuccess: () => {},
    onError: () => {
      toast.error(getErrorToastMessage(new Error(t("page.forgotPassword.emailDoesNotExist"))));
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <div className="m-auto flex w-[560px] flex-col">
      <h1 className="mb-6 text-34 font-normal leading-11 dark:text-white">
        {t("page.forgotPassword.title")}
      </h1>
      <p className="mb-10 leading-6 dark:text-white">{t("page.forgotPassword.subtitle")}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          label={t("page.forgotPassword.emailLabel")}
          type="email"
          placeholder={t("page.forgotPassword.emailLabel")}
          {...register("email")}
          error={errors.email?.message}
          onChange={() => {
            register("email");
          }}
        />

        <div className="flex flex-col items-center gap-0 mt-16">
          <Button className="w-55" variant="filled" type="submit" disabled={!emailValue?.trim()}>
            {t("page.forgotPassword.resetPassword")}
          </Button>

          <Link to="/auth" search={{ mode: "login" }}>
            <Button variant="default" type="button">
              {t("page.forgotPassword.cancel")}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
