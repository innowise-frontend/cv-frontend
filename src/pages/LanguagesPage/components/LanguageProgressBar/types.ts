import { Proficiency } from "@services/graphql/__generated__/graphql";

export interface LanguageProps {
  userId: string;
  name: string;
  proficiency: Proficiency;
  chosen?: boolean;
  isDeleteMode?: boolean;
  onClick?: () => void;
}
