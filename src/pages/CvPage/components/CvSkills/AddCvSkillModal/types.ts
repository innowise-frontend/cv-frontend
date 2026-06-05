import { ProfileQuery } from "@services/graphql/__generated__/graphql";

export type AddCvSkillModalProps = {
  cvId: string;
  skills: ProfileQuery["profile"]["skills"] | undefined;
  addedSkillNames?: readonly string[];
};
