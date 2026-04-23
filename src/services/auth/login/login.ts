import { type AuthInput, LoginDocument } from "@services/graphql/__generated__/graphql";
import { graphqlClient } from "@services/graphql/client";

export async function login(auth: AuthInput) {
  const response = await graphqlClient.request(LoginDocument, {
    auth: { email: auth.email, password: auth.password },
  });

  return response.login;
}
