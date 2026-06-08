import type { Department, UpdateDepartmentInput } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

const UPDATE_DEPARTMENT_MUTATION = `
  mutation UpdateDepartment($department: UpdateDepartmentInput!) {
    updateDepartment(department: $department) {
      id
      name
    }
  }
`;

export const updateDepartment = async (payload: UpdateDepartmentInput): Promise<Department> => {
  const response = await requestWithAuth<
    { updateDepartment: Department },
    { department: UpdateDepartmentInput }
  >(UPDATE_DEPARTMENT_MUTATION, { department: payload });

  return response.updateDepartment;
};
