import { Mastery, ProfileQuery, SkillsQuery } from "@root/services/graphql/__generated__/graphql";

type SkillItem = SkillsQuery["skills"]["items"][number];
type ProfileSkillItem = ProfileQuery["profile"]["skills"][number];

export type AddSkillDraft = {
  name: string;
  mastery: Mastery | "";
  categoryId?: string | null;
};

type AddSkillModalPropsBase = {
  skills: SkillItem[] | ProfileSkillItem[] | undefined;
  addedSkillNames?: readonly string[];
  disabled?: boolean;
  onAdd: (draft: AddSkillDraft) => Promise<unknown> | unknown;
};

export type AddSkillModalProps = AddSkillModalPropsBase &
  (
    | { masteryFromSkill: true; masteryOptions?: never }
    | { masteryFromSkill?: false; masteryOptions: { value: string; label: string }[] }
  );
