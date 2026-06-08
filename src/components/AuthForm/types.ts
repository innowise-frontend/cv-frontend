import { FormSchema } from "./validation";

export interface AuthFormProps {
  onSubmit: (data: FormSchema) => void;
  label: string;
  isSignup?: boolean;
}
