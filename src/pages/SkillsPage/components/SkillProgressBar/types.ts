import { Mastery } from "@services/graphql/__generated__/graphql";

export interface SkillProgressBarProps {
  userId: string;
  name: string;
  mastery: Mastery;
  categoryId?: string | null;
  chosen?: boolean;
  isDeleteMode?: boolean;
  onClick?: () => void;
}
