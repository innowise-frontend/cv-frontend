import type { SignupInput } from "@services/graphql/__generated__/graphql";
import { FormSchema } from "./validation";

type AuthFormPropsBase = {
  label: string;
};

export type AuthFormProps =
  | (AuthFormPropsBase & {
      isSignup?: false;
      onSubmit: (data: FormSchema) => void;
    })
  | (AuthFormPropsBase & {
      isSignup: true;
      onSubmit: (data: SignupInput) => void;
    });
