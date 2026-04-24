import { UpdateTokenDocument } from "@services/graphql/__generated__/graphql";
import { graphqlClient } from "@services/graphql/client";

export async function updateToken() {
  const response = await graphqlClient.request(UpdateTokenDocument);

  return response.updateToken;
}
