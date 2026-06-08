import { SkillsQuery } from "@services/graphql/__generated__/graphql";

export const getSkillNamesFromSkillsData = (
  skillsData?: Pick<SkillsQuery["skills"], "items">,
): string[] =>
  Array.from(
    new Set(
      (skillsData?.items ?? [])
        .map((item) => item.name?.trim())
        .filter((name): name is string => Boolean(name)),
    ),
  );

export const getEnvironmentOptions = (existing: string[]) =>
  existing.map((item) => ({ label: item, value: item }));
