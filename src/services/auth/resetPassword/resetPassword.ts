import { ResetPasswordDocument } from "@services/graphql/__generated__/graphql";
import { graphqlClient } from "@services/graphql/client";

export async function resetPassword(
  token: string,
  newPassword: string,
  confirmPassword: string,
): Promise<void> {
  await graphqlClient.request(
    ResetPasswordDocument,
    { auth: { newPassword, confirmPassword } },
    { Authorization: `Bearer ${token}` },
  );
}
