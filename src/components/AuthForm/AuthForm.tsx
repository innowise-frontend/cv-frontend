import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

  return (
    <form
      className="flex flex-col justify-center items-center gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="email"
        placeholder="Email"
        label="Email"
        {...register("email")}
        autoComplete="email"
        error={errors.email?.message}
        className="rounded-none"
      />
      <Input
        type="password"
        placeholder="Password"
        label="Password"
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
