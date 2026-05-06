import { DeleteProfileLanguageInput } from "@root/services/graphql/__generated__/graphql";

export interface RemoveLanguageModalProps {
  deletedLanguages: DeleteProfileLanguageInput;
  onChangeDeletedLanguages: (value: DeleteProfileLanguageInput) => void;
  onChangeMode: (mode: boolean) => void;
}
