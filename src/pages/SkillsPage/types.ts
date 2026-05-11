import { SkillMastery } from "@root/services/graphql/__generated__/graphql";

export interface SkillGroup {
  categoryId: string | null;
  categoryName: string;
  skills: SkillMastery[];
}
