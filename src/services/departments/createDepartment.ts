import type { CreateDepartmentInput, Department } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

const CREATE_DEPARTMENT_MUTATION = `
  mutation CreateDepartment($department: CreateDepartmentInput!) {
    createDepartment(department: $department) {
      id
      name
    }
  }
`;

export const createDepartment = async (payload: CreateDepartmentInput): Promise<Department> => {
  const response = await requestWithAuth<
    { createDepartment: Department },
    { department: CreateDepartmentInput }
  >(CREATE_DEPARTMENT_MUTATION, { department: payload });

  return response.createDepartment;
};
