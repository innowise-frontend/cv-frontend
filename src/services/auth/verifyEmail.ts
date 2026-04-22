import { LOCAL_STORAGE_KEYS } from "@root/constants/localStorage";
import { VerifyMailDocument } from "@services/graphql/__generated__/graphql";
import { graphqlClient } from "@services/graphql/client";

export async function verifyMail(otp: string): Promise<void> {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  await graphqlClient.request(
    VerifyMailDocument,
    { otp: otp.trim() },
    { Authorization: `Bearer ${token}` },
  );
}
