import {
  DepartmentsDocument,
  DepartmentsQuery,
  DepartmentsQueryVariables,
  SearchPaginationInput,
} from "../graphql/__generated__/graphql";
import { requestWithAuth } from "../graphql/client";

export const getDepartments = async (params: SearchPaginationInput) => {
  const response = await requestWithAuth<DepartmentsQuery, DepartmentsQueryVariables>(
    DepartmentsDocument,
    { params },
  );

  return response.departments;
};
