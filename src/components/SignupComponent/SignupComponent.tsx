import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@components/shared";
import { AuthForm } from "@root/components/AuthForm";
import { signup } from "@root/services/auth/signup";

export const SignupComponent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return signup({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: () => {
      setErrorMessage("");
      navigate({ to: "/" });
    },
    onError: (error) => {
      setErrorMessage(error instanceof Error ? error.message : "Failed to create account");
      console.log(errorMessage);
    },
  });

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex flex-col w-full">
        <h2 className="text-[34px] mb-6">Sign up now</h2>
        <p className="mb-10">Welcome! Sign up to continue</p>
        <AuthForm
          onSubmit={(data) => {
            mutate(data);
          }}
          label="Create account"
        />
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
