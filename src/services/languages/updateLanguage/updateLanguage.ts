import {
  UpdateLanguageDocument,
  UpdateLanguageInput,
  UpdateLanguageMutation,
  UpdateLanguageMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const updateLanguage = async (language: UpdateLanguageInput) => {
  const response = await requestWithAuth<UpdateLanguageMutation, UpdateLanguageMutationVariables>(
    UpdateLanguageDocument,
    { language },
  );

  return response.updateLanguage;
};
