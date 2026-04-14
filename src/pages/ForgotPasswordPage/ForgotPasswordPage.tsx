import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ClientError } from "graphql-request";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
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
    onError: (error) => {
      const message =
        error instanceof ClientError ? error.response.errors?.[0].message : error.message;

      toast.error(message);
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
          onChange={() => {
            register("email");
          }}
        />

        <div className="flex flex-col items-center gap-0 mt-16">
          <Button className="w-55" variant="filled" type="submit" disabled={!emailValue?.trim()}>
            Reset password
          </Button>

          <Link to="/auth" search={{ mode: "login" }}>
            <Button variant="default" type="button">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
