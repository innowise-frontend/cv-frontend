import { SkillsQuery } from "@services/graphql/__generated__/graphql";

export type AddSkillModalProps = {
  userId: string;
  skills: SkillsQuery["skills"]["items"] | undefined;
  addedSkillNames?: readonly string[];
  masteryOptions: { value: string; label: string }[];
};
