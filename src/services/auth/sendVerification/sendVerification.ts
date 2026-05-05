import { SendVerificationDocument } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export async function sendVerification(email: string): Promise<void> {
  await requestWithAuth(SendVerificationDocument, { email: email.trim() });
}
