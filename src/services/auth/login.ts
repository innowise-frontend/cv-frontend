import { graphqlClient } from "@services/graphql/client";
import { AuthInput, LoginDocument } from "../graphql/__generated__/graphql";

export async function login(auth: AuthInput) {
  const response = await graphqlClient.request(LoginDocument, {
    auth: { email: auth.email, password: auth.password },
  });

  return response.login;
}
