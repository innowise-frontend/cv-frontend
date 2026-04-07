import { FORGOT_PASSWORD_MUTATION, RESET_PASSWORD_MUTATION } from "@root/services/graphql/queries";
import { graphqlClient } from "@services/graphql/client";

export async function forgotPassword(email: string): Promise<void> {
  await graphqlClient.request(FORGOT_PASSWORD_MUTATION, {
    auth: { email: email.trim() },
  });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await graphqlClient.request(
    RESET_PASSWORD_MUTATION,
    { auth: { newPassword } },
    { Authorization: `Bearer ${token}` },
  );
}
