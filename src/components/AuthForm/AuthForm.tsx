import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input } from "@root/components/shared";
import { AuthFormProps } from "./types";
import { formSchema, FormSchema } from "./validation";

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
      className="flex flex-col justify-center items-center gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="email"
        placeholder="Email"
        {...register("email")}
        error={errors.email?.message}
        onChange={(e) => {
          register("email").onChange(e);
        }}
      />
      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
        error={errors.password?.message}
        onChange={(e) => {
          register("password").onChange(e);
        }}
      />
      <Button type="submit" variant="filled" className="w-40 mb-2">
        {label}
      </Button>
    </form>
  );
};
