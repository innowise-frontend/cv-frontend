import {
  ProfileDocument,
  ProfileQuery,
  ProfileQueryVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const getUserProfile = async (userId: string) => {
  const response = await requestWithAuth<ProfileQuery, ProfileQueryVariables>(ProfileDocument, {
    userId,
  });

  return response.profile;
};
