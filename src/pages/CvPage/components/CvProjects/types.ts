import { ReactNode } from "react";
import { SortOrder } from "@root/constants";
import { ProjectsTableRow } from "@root/pages/ProjectsPage/components/ProjectsTable/types";
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

export type CvProjectsTableColumnsOptions = {
  currentSort: SortOrder;
  currentSortBy: CvProjectsSortBy;
  onSort: (sortBy: CvProjectsSortBy) => void;
  renderUpdateModal?: (row: ProjectsTableRow) => ReactNode;
  renderDeleteModal?: (row: ProjectsTableRow) => ReactNode;
};
