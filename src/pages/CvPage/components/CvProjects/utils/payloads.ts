import { toApiProjectDate } from "@components/shared";
import type { ProjectFormValues } from "@pages/ProjectsPage/components/types";
import { parseResponsibilities } from "../components/Responsibilities/utils";

export const buildAddCvProjectPayload = (cvId: string, data: ProjectFormValues) => {
  const startDate = toApiProjectDate(data.startDate);

  if (!startDate) return null;

  return {
    cvId,
    projectId: data.name,
    start_date: startDate,
    end_date: toApiProjectDate(data.endDate) ?? null,
    roles: data.roles ?? [],
    responsibilities: parseResponsibilities(data.responsibilities ?? ""),
  };
};

export const buildUpdateCvProjectPayload = (
  cvId: string,
  projectId: string,
  data: ProjectFormValues,
) => {
  const startDate = toApiProjectDate(data.startDate);

  if (!startDate) return null;

  return {
    cvId,
    projectId,
    start_date: startDate,
    end_date: toApiProjectDate(data.endDate) ?? null,
    roles: data.roles ?? [],
    responsibilities: parseResponsibilities(data.responsibilities ?? ""),
  };
};
