import { SkillCategory, SkillMastery } from "@root/services/graphql/__generated__/graphql";

export type GroupedSkillsViewProps = {
  skills: readonly SkillMastery[] | null | undefined;
  categories: SkillCategory[] | null | undefined;
  uncategorizedLabel: string;
  emptyMessage: string;
};
