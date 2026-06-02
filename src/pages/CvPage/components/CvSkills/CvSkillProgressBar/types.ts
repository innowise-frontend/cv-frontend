import { Mastery } from "@services/graphql/__generated__/graphql";

export type CvSkillProgressBarProps = {
  cvId: string;
  name: string;
  mastery: Mastery;
  categoryId?: string | null;
  chosen?: boolean;
  isDeleteMode?: boolean;
  onClick?: () => void;
};
