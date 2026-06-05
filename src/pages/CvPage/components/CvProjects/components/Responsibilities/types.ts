import { ProjectsTableRow } from "@root/pages/ProjectsPage/components/ProjectsTable/types";

export type CvProjectsSubRowData = ProjectsTableRow & {
  responsibilities?: string[];
};
