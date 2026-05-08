import { SkillsQuery } from "@services/graphql/__generated__/graphql";

export type SkillSelectOption = {
  value: string;
  label: string;
  categoryId?: string | null;
};

export interface AddSkillModalProps {
  skills: SkillsQuery["skills"]["items"] | undefined;
  masteryOptions: { value: string; label: string }[];
}
