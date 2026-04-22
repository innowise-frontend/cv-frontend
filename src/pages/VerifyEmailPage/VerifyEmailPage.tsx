import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Button, CodeInput } from "@components/shared";
import { ROUTES } from "@root/constants/routes";
import { verifyMail } from "@root/services/auth/verifyEmail";
import { FormValues } from "./types";

export function VerifyEmailPage() {
  const navigate = useNavigate();

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
    onSuccess: () => {
      navigate({ to: ROUTES.PROFILE });
    },
    onError: () => {
      setError("code", { message: "Invalid code" });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data.code);
  };

  const codeValue = useWatch({ control, name: "code" });

  return (
    <div className="m-auto flex w-[560px] flex-col items-center">
      <h1 className="mb-6 text-34 font-normal leading-11 dark:text-white">Email verification</h1>

      <p className="mb-10 leading-6 dark:text-white">
        Enter the verification code we sent to your email.
      </p>

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
          Confirm
        </Button>

        <Link to={ROUTES.ROOT}>
          <Button variant="default" type="button">
            Later
          </Button>
        </Link>
      </div>
    </div>
  );
}
