import { formatProjectDateDisplay } from "@components/shared";
import type { ProjectsTableRow } from "@pages/ProjectsPage/components/ProjectsTable/types";
import type { ProjectFormValues } from "@pages/ProjectsPage/components/types";
import { formatResponsibilities } from "../components/Responsibilities/utils";
import type { CvProjectItem } from "../types";

export const mapCvProjectToTableRow = (project: CvProjectItem): ProjectsTableRow => ({
  id: project.project.id,
  name: project.name,
  domain: project.domain,
  description: project.description,
  start_date: project.start_date,
  end_date: project.end_date,
  environment: project.environment ?? [],
});

export const toCvProjectFormValues = (
  row: ProjectsTableRow & { responsibilities?: string[]; roles?: string[] },
): ProjectFormValues => ({
  name: row.name,
  domain: row.domain,
  description: row.description,
  startDate: formatProjectDateDisplay(row.start_date),
  endDate: formatProjectDateDisplay(row.end_date),
  environment: row.environment ?? [],
  roles: row.roles ?? [],
  responsibilities: formatResponsibilities(row.responsibilities ?? []),
});
