import {
  UpdateProfileLanguageDocument,
  UpdateProfileLanguageInput,
  UpdateProfileLanguageMutation,
  UpdateProfileLanguageMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const updateProfileLanguage = async (language: UpdateProfileLanguageInput) => {
  const response = await requestWithAuth<
    UpdateProfileLanguageMutation,
    UpdateProfileLanguageMutationVariables
  >(UpdateProfileLanguageDocument, { language });

  return response.updateProfileLanguage;
};
