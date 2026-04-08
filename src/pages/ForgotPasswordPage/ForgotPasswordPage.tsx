import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useForm, useWatch } from "react-hook-form";
import { Button, Input } from "@components/shared";
import { forgotPassword } from "@services/auth/password";

type FormValues = {
  email: string;
};

export function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const emailValue = useWatch({ control, name: "email" });

  const { mutate } = useMutation({
    mutationFn: (data: FormValues) => forgotPassword(data.email),
    onSuccess: () => {
      clearErrors();
    },
    onError: () => {
      setError("email", {
        message: "Email doesn't exist.",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <div className="m-auto flex w-[560px] flex-col">
      <h1 className="mb-6 text-34 font-normal leading-11 dark:text-white">Forgot password</h1>
      <p className="mb-10 leading-6 dark:text-white">
        We will send you an email with further instructions
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
          onChange={(e) => {
            clearErrors("email");
            register("email").onChange(e);
          }}
        />

        <div className="flex flex-col items-center gap-0 mt-16">
          <Button className="w-55" variant="filled" type="submit" disabled={!emailValue?.trim()}>
            Reset password
          </Button>

          <Link to="/signup">
            <Button variant="default" type="button">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
