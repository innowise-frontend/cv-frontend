import { SignupDocument, type AuthInput } from "@services/graphql/__generated__/graphql";
import { graphqlClient } from "@services/graphql/client";

export async function signup(auth: AuthInput) {
  const response = await graphqlClient.request(SignupDocument, {
    auth: { email: auth.email, password: auth.password },
  });

  return response.signup;
}
