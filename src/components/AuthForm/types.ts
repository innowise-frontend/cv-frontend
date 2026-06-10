import type { AuthFormValues } from "./validation";

export type AuthFormProps = {
  label: string;
  isSignup?: boolean;
  onSubmit: (data: AuthFormValues) => void;
};
