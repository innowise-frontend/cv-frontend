import { Mastery } from "@services/graphql/__generated__/graphql";

export type CvSkillProgressBarProps = {
  name: string;
  mastery: Mastery;
  chosen?: boolean;
  isDeleteMode?: boolean;
  onClick?: () => void;
};
