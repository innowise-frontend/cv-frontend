import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Button, Input } from "@components/shared";
import { resetPassword } from "@services/auth/password";
import { resetPasswordSchema, ResetPasswordFormValues } from "./validation";

export function ResetPasswordPage() {
  const { token } = useSearch({ from: "/reset-password" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
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
    onSuccess: () => navigate({ to: "/login" }),
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    mutate(data);
  };

  return (
    <div className="m-auto flex w-[560px] flex-col">
      <h1 className="mb-6 text-34 font-normal leading-11 dark:text-white">Reset password</h1>
      <p className="mb-10 leading-6 dark:text-white">Enter a new password and confirm it below.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-4">
          <Input
            label="New password"
            type="password"
            placeholder="New password"
            autoComplete="new-password"
            {...register("newPassword")}
            error={errors.newPassword?.message}
            onChange={(e) => {
              clearErrors("newPassword");
              register("newPassword").onChange(e);
            }}
          />

          <Input
            label="Confirm password"
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            onChange={(e) => {
              clearErrors("confirmPassword");
              register("confirmPassword").onChange(e);
            }}
          />
        </div>

        <div className="mt-13 flex flex-col items-center gap-0">
          <Button className="w-30" variant="filled" type="submit" disabled={!isValid}>
            Submit
          </Button>

          <Link to="/login">
            <Button variant="default" type="button">
              Go sign in
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
