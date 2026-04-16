import { UpdateTokenDocument } from "../graphql/__generated__/graphql";
import { graphqlClient } from "../graphql/client";

export async function updateToken() {
  const response = await graphqlClient.request(UpdateTokenDocument);

  return response.updateToken;
}
