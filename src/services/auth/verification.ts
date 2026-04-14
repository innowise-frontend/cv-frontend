import { VerifyMailDocument } from "@services/graphql/__generated__/graphql";
import { graphqlClient } from "@services/graphql/client";

export async function verifyMail(otp: string): Promise<void> {
  const token = localStorage.getItem("access_token");

  await graphqlClient.request(
    VerifyMailDocument,
    { otp: otp.trim() },
    { Authorization: `Bearer ${token}` },
  );
}
