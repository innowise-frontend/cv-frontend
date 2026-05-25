import {
  DepartmentsDocument,
  DepartmentsQuery,
  DepartmentsQueryVariables,
} from "../graphql/__generated__/graphql";
import { requestWithAuth } from "../graphql/client";

export const getDepartments = async () => {
  const response = await requestWithAuth<DepartmentsQuery, DepartmentsQueryVariables>(
    DepartmentsDocument,
  );

  return response.departments;
};
