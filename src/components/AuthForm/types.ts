export type AuthFormProps<T> = {
  label: string;
  isSignup?: boolean;
  onSubmit: (data: T) => void;
};
