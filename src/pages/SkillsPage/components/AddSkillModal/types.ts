import { Mastery, SkillsQuery } from "@root/services/graphql/__generated__/graphql";

type SkillItem = SkillsQuery["skills"]["items"][number];

export type AddSkillDraft = {
  name: string;
  mastery: Mastery | "";
  categoryId?: string | null;
};

export type AddSkillModalProps = {
  skills: SkillItem[] | undefined;
  addedSkillNames?: readonly string[];
  masteryOptions: { value: string; label: string }[];
  disabled?: boolean;
  onAdd: (draft: AddSkillDraft) => Promise<unknown> | unknown;
};
