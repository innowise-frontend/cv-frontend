import { differenceInMonths } from "date-fns";
import { parseProjectDate } from "@components/shared";
import { buildCategoryNameById, groupSkillsByCategory } from "@pages/SkillsPage/const";
import { SkillCategory } from "@services/graphql/__generated__/graphql";
import { CvPreviewData, CvPreviewProject, CvPreviewSkillGroup, CvPreviewSkillRow } from "../types";

const projectDurationMonths = (project: CvPreviewProject): number => {
  const startDate = parseProjectDate(project.start_date);
  const endDate = project.end_date ? parseProjectDate(project.end_date) : new Date();

  if (!startDate || !endDate) return 0;

  return Math.max(0, differenceInMonths(endDate, startDate) + 1);
};

const skillMatchesProject = (skillName: string, project: CvPreviewProject): boolean => {
  const normalizedSkill = skillName.trim().toLowerCase();

  return project.environment.some((tech) => {
    const normalizedTech = tech.trim().toLowerCase();

    return (
      normalizedTech === normalizedSkill ||
      normalizedTech.includes(normalizedSkill) ||
      normalizedSkill.includes(normalizedTech)
    );
  });
};

export const roundExperienceYearsFromMonths = (totalMonths: number): number => {
  const years = totalMonths / 12;

  return years < 0.1 ? 1 : Math.round(years);
};

const getProjectsForSkills = (
  skillNames: readonly string[],
  projects: CvPreviewProject[],
): CvPreviewProject[] => {
  const seenProjectIds = new Set<string>();

  return projects.filter((project) => {
    if (seenProjectIds.has(project.id)) return false;

    const isRelated = skillNames.some((skillName) => skillMatchesProject(skillName, project));

    if (!isRelated) return false;

    seenProjectIds.add(project.id);

    return true;
  });
};

const isSkillUsedInProjects = (skillName: string, projects: CvPreviewProject[]): boolean =>
  getProjectsForSkills([skillName], projects).length > 0;

export const computeSkillExperience = (
  skillName: string,
  projects: CvPreviewProject[],
): Pick<CvPreviewSkillRow, "years" | "lastUsed"> => {
  const { totalYears, lastUsed } = computeCategoryExperience([skillName], projects);

  return { years: totalYears, lastUsed };
};

export const computeCategoryExperience = (
  skillNames: readonly string[],
  projects: CvPreviewProject[],
): Pick<CvPreviewSkillGroup, "totalYears" | "lastUsed"> => {
  const relatedProjects = getProjectsForSkills(skillNames, projects);

  if (!relatedProjects.length) {
    return { totalYears: null, lastUsed: null };
  }

  const totalMonths = relatedProjects.reduce(
    (sum, project) => sum + projectDurationMonths(project),
    0,
  );

  const lastUsed = relatedProjects.reduce((maxYear, project) => {
    const endDate = project.end_date ? parseProjectDate(project.end_date) : new Date();
    const year = endDate?.getFullYear() ?? new Date().getFullYear();

    return Math.max(maxYear, year);
  }, 0);

  return {
    totalYears: roundExperienceYearsFromMonths(totalMonths),
    lastUsed,
  };
};

export const buildCvPreviewSkillGroups = (
  cv: CvPreviewData,
  categories: SkillCategory[] | null | undefined,
  uncategorizedLabel: string,
): CvPreviewSkillGroup[] => {
  const projects = cv.projects ?? [];
  const categoryNameById = buildCategoryNameById(categories);
  const cvSkillsUsedInProjects = (cv.skills ?? []).filter((skill) =>
    isSkillUsedInProjects(skill.name, projects),
  );

  return groupSkillsByCategory(cvSkillsUsedInProjects, categoryNameById, uncategorizedLabel).map(
    (group) => {
      const skillNames = group.skills.map((skill) => skill.name);

      return {
        categoryId: group.categoryId,
        categoryName: group.categoryName,
        skills: group.skills.map((skill) => ({
          name: skill.name,
          ...computeSkillExperience(skill.name, projects),
        })),
        ...computeCategoryExperience(skillNames, projects),
      };
    },
  );
};

export const buildTechSummaryLines = (groups: CvPreviewSkillGroup[]): string[] =>
  groups
    .map((group) => {
      const names = group.skills.map((skill) => skill.name).join(", ");

      return names ? `${group.categoryName}: ${names}` : "";
    })
    .filter(Boolean);
