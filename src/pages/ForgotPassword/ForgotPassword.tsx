import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { Button, InputWithLabel } from "@components/shared";
import { forgotPassword } from "@services/auth/password";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();

  const { mutate } = useMutation({
    mutationFn: () => forgotPassword(email),
    onSuccess: () => setEmailError(undefined),
    onError: () => setEmailError("Email doesn't exist."),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailError(undefined);
    mutate();
  };

  return (
    <div className="m-auto flex w-[560px] flex-col">
      <h1 className="mb-6 text-34 font-normal leading-11 dark:text-white">Forgot password</h1>
      <p className="mb-10 leading-6 dark:text-white">
        We will sent you an email with further instructions
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <InputWithLabel
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          error={emailError}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(undefined);
          }}
        />
        <div className="flex flex-col items-center gap-0 mt-16">
          <Button className="w-55" variant="filled" type="submit" disabled={!email.trim()}>
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
