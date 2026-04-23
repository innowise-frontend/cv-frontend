import {
  ChangePasswordDocument,
  ForgotPasswordDocument,
  ResetPasswordDocument,
  type ChangePasswordInput,
} from "@services/graphql/__generated__/graphql";
import { graphqlClient } from "@services/graphql/client";

export async function forgotPassword(email: string): Promise<void> {
  await graphqlClient.request(ForgotPasswordDocument, {
    auth: { email: email.trim() },
  });
}

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

export async function changePassword(
  accessToken: string,
  args: ChangePasswordInput,
): Promise<void> {
  await graphqlClient.request(
    ChangePasswordDocument,
    { args },
    { Authorization: `Bearer ${accessToken}` },
  );
}
