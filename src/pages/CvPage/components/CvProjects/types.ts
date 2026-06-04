import { formatProjectDateDisplay } from "@components/shared";
import type { ProjectsTableRow } from "@pages/ProjectsPage/components/ProjectsTable/types";
import type { ProjectFormValues } from "@pages/ProjectsPage/components/types";
import type { CvQuery } from "@services/graphql/__generated__/graphql";
import { formatResponsibilities } from "./utils";

export type CvProjectItem = NonNullable<NonNullable<CvQuery["cv"]>["projects"]>[number];

export type CvProjectsTableRow = CvProjectItem & {
  responsibilities: string[];
};

export type ProjectCatalogItem = { id: string; name: string };

export type CvProjectsSortBy = "name" | "domain" | "end_date";

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
  row: ProjectsTableRow & { responsibilities?: string[] },
): ProjectFormValues => ({
  name: row.name,
  domain: row.domain,
  description: row.description,
  startDate: formatProjectDateDisplay(row.start_date),
  endDate: formatProjectDateDisplay(row.end_date),
  environment: row.environment ?? [],
  responsibilities: formatResponsibilities(row.responsibilities ?? []),
});
