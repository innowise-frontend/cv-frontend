import { SkillsQuery } from "@services/graphql/__generated__/graphql";

export type AddCvSkillModalProps = {
  cvId: string;
  skills: SkillsQuery["skills"]["items"] | undefined;
};
