import {
  ProjectsDocument,
  ProjectsQuery,
  ProjectsQueryVariables,
  SearchPaginationInput,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const getProjects = async (params: SearchPaginationInput) => {
  const response = await requestWithAuth<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, {
    params,
  });

  return response.projects;
};
