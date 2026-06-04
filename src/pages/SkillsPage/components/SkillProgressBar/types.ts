import { Mastery } from "@root/services/graphql/__generated__/graphql";

export type UpdateSkillDraft = {
  mastery: Mastery;
};

export type SkillProgressBarProps = {
  name: string;
  mastery: Mastery;
  masteryOptions: { value: string; label: string }[];
  disabled?: boolean;
  chosen?: boolean;
  isDeleteMode?: boolean;
  onClick?: () => void;
  onUpdate: (draft: UpdateSkillDraft) => Promise<unknown> | unknown;
};
