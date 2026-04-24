import {
  ChangePasswordDocument,
  ChangePasswordInput,
} from "@root/services/graphql/__generated__/graphql";
import { graphqlClient } from "@root/services/graphql/client";

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
