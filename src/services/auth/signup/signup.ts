import { SignupDocument, type SignupInput } from "@services/graphql/__generated__/graphql";
import { graphqlClient } from "@services/graphql/client";

export async function signup(auth: SignupInput) {
  const response = await graphqlClient.request(SignupDocument, {
    auth: {
      email: auth.email,
      password: auth.password,
      confirmPassword: auth.confirmPassword,
    },
  });

  return response.signup;
}
