import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ClientError } from "graphql-request";
import { toast } from "sonner";
import { AuthForm } from "@components/AuthForm";
import { Button } from "@components/shared";
import { signup } from "@services/auth/signup";

export const Signup = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return signup({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("role", response.user.role);
      navigate({ to: "/" });
    },
    onError: (error) => {
      const message =
        error instanceof ClientError ? error.response.errors?.[0].message : error.message;
      toast.error(message);
    },
  });

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex flex-col w-full">
        <h2 className="text-34 mb-6">Sign up now</h2>
        <p className="mb-10">Welcome! Sign up to continue</p>
        <AuthForm onSubmit={mutate} label="Create account" />
        <Button
          type="button"
          variant="default"
          className="w-55 mx-auto"
          onClick={() => {
            navigate({
              to: "/auth",
              search: { mode: "login" },
            });
          }}
        >
          I have an account
        </Button>
      </div>
    </div>
  );
};
