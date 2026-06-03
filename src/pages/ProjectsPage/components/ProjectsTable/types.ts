import { ProjectsQuery } from "@root/services/graphql/__generated__/graphql";

export type ProjectsTableRow = ProjectsQuery["projects"]["items"][number];
