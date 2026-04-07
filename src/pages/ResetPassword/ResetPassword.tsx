import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button, Input } from "@components/shared";
import { resetPassword } from "@services/auth/password";

export function ResetPassword() {
  const { token } = useSearch({ from: "/reset-password" });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const passwordError =
    confirmPassword && newPassword !== confirmPassword ? "Passwords do not match" : undefined;

  const { mutate } = useMutation({
    mutationFn: () => resetPassword(token, newPassword),
    onSuccess: () => navigate({ to: "/login" }),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword.trim() || !confirmPassword.trim()) return;

    if (passwordError) return;

    mutate();
  };

  return (
    <div className="m-auto flex w-[560px] flex-col">
      <h1 className="mb-6 text-34 font-normal leading-11 dark:text-white">Reset password</h1>
      <p className="mb-10 leading-6 dark:text-white">Enter a new password and confirm it below.</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-4">
          <Input
            label="New password"
            type="password"
            name="newPassword"
            autoComplete="new-password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <Input
            label="Confirm password"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirm password"
            value={confirmPassword}
            error={passwordError}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <div className="mt-16 flex flex-col items-center gap-0">
          <Button
            className="w-30"
            variant="filled"
            type="submit"
            disabled={!newPassword.trim() || !confirmPassword.trim() || Boolean(passwordError)}
          >
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
