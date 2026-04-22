import { VerifyMailDocument } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export async function verifyMail(otp: string): Promise<void> {
  await requestWithAuth(VerifyMailDocument, { otp: otp.trim() });
}
