import { Mastery, SkillCategory, SkillMastery } from "@root/services/graphql/__generated__/graphql";

export const MASTERY_ORDER: readonly Mastery[] = [
  Mastery.Novice,
  Mastery.Advanced,
  Mastery.Competent,
  Mastery.Proficient,
  Mastery.Expert,
];

export const buildCategoryNameById = (
  roots: SkillCategory[] | null | undefined,
): Map<string, string> => {
  const map = new Map<string, string>();

  const visit = (category: SkillCategory) => {
    map.set(category.id, category.name);
    category.children?.forEach(visit);
  };

  roots?.forEach(visit);

  return map;
};

export interface SkillGroup {
  categoryId: string | null;
  categoryName: string;
  skills: SkillMastery[];
}

export const groupSkillsByCategory = (
  skills: readonly SkillMastery[] | null | undefined,
  categoryNameById: Map<string, string>,
  uncategorizedLabel: string,
): SkillGroup[] => {
  if (!skills || skills.length === 0) {
    return [];
  }

  const categoryOrder = Array.from(categoryNameById.keys());
  const buckets = new Map<string | null, SkillMastery[]>();

  for (const skill of skills) {
    const key =
      skill.categoryId && categoryNameById.has(skill.categoryId) ? skill.categoryId : null;
    const bucket = buckets.get(key);

    if (bucket) {
      bucket.push(skill);
    } else {
      buckets.set(key, [skill]);
    }
  }

  const orderedKeys: (string | null)[] = [
    ...categoryOrder.filter((id) => buckets.has(id)),
    ...(buckets.has(null) ? [null] : []),
  ];

  return orderedKeys.map((id) => ({
    categoryId: id,
    categoryName: id ? (categoryNameById.get(id) ?? uncategorizedLabel) : uncategorizedLabel,
    skills: buckets.get(id) ?? [],
  }));
};
