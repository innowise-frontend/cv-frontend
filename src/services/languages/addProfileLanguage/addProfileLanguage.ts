import {
  AddProfileLanguageDocument,
  AddProfileLanguageInput,
  AddProfileLanguageMutation,
  AddProfileLanguageMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const addProfileLanguage = async (language: AddProfileLanguageInput) => {
  const response = await requestWithAuth<
    AddProfileLanguageMutation,
    AddProfileLanguageMutationVariables
  >(AddProfileLanguageDocument, { language });

  return response.addProfileLanguage;
};
