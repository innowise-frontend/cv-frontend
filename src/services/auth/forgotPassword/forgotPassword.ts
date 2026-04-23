import { ForgotPasswordDocument } from "@services/graphql/__generated__/graphql";
import { graphqlClient } from "@services/graphql/client";

export async function forgotPassword(email: string): Promise<void> {
  await graphqlClient.request(ForgotPasswordDocument, {
    auth: { email: email.trim() },
  });
}
