import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@components/shared";
import { login } from "@root/services/auth/login";
import { AuthForm } from "../AuthForm";

export const LoginComponent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return login({ email: data.email, password: data.password });
    },
    onSuccess: () => {
      setErrorMessage("");
      navigate({ to: "/" });
    },
    onError: (error) => {
      setErrorMessage(error instanceof Error ? error.message : "Failed to login");
      console.log(errorMessage);
    },
  });

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex flex-col w-full">
        <h2 className="text-[34px] mb-6">Welcome back</h2>
        <p className="mb-10">Hello again! Sign in to continue</p>
        <AuthForm
          onSubmit={(data) => {
            mutate(data);
          }}
          label="Sign in"
        />
        <Button type="button" variant="default" className="w-40 mx-auto">
          <Link to={"/forgot-password"}>Forgot password</Link>
        </Button>
      </div>
    </div>
  );
};
