import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, CodeInput } from "@components/shared";
import { ROUTES } from "@root/constants/routes";
import { useAuth } from "@root/hooks/useAuth/useAuth";
import { verifyMail } from "@services/auth";
import { FormValues } from "./types";

export const VerifyEmailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { code: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (code: string) => {
      await verifyMail(code);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate({ to: ROUTES.PROFILE });
    },
    onError: () => {
      setError("code", { message: t("page.verifyEmail.invalidCode") });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data.code);
  };

  const codeValue = useWatch({ control, name: "code" });

  return (
    <div className="m-auto flex w-[560px] flex-col items-center">
      <h1 className="mb-6 text-34 font-normal leading-11 dark:text-white">
        {t("page.verifyEmail.title")}
      </h1>

      <p className="mb-10 leading-6 dark:text-white">{t("page.verifyEmail.subtitle")}</p>

      <Controller
        name="code"
        control={control}
        rules={{
          required: true,
          minLength: 6,
        }}
        render={({ field }) => (
          <CodeInput
            value={field.value}
            onChange={(v) => {
              field.onChange(v);
              clearErrors("code");
            }}
            error={!!errors?.code?.message}
          />
        )}
      />

      <div className="mt-14.5 flex flex-col items-center gap-0">
        <Button
          className="w-30"
          variant="filled"
          type="button"
          disabled={codeValue.trim().length !== 6 || isPending}
          onClick={handleSubmit(onSubmit)}
        >
          {t("page.verifyEmail.confirm")}
        </Button>

        <Link to="/users/$userId" params={{ userId: userId }}>
          <Button variant="default" type="button">
            {t("page.verifyEmail.later")}
          </Button>
        </Link>
      </div>
    </div>
  );
};
