import { DepartmentsQuery } from "@services/graphql/__generated__/graphql";

export type DepartmentTableRow = DepartmentsQuery["departments"][number];
