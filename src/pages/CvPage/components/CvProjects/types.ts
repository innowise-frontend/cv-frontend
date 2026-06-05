import type { CvQuery, ProjectsQuery } from "@services/graphql/__generated__/graphql";

export type CvProjectItem = NonNullable<NonNullable<CvQuery["cv"]>["projects"]>[number];

export type CvProjectsTableRow = CvProjectItem & {
  responsibilities: string[];
  roles: string[];
};

export type ProjectCatalogItem = ProjectsQuery["projects"]["items"][number];

export type CvProjectsSortBy = "name" | "domain" | "end_date";

export type CvProjectDateBounds = {
  startDate?: string | null;
  endDate?: string | null;
};
