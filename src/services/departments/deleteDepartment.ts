import type { DeleteDepartmentInput, DeleteResult } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

const DELETE_DEPARTMENT_MUTATION = `
  mutation DeleteDepartment($department: DeleteDepartmentInput!) {
    deleteDepartment(department: $department) {
      affected
    }
  }
`;

export const deleteDepartment = async (payload: DeleteDepartmentInput): Promise<DeleteResult> => {
  const response = await requestWithAuth<
    { deleteDepartment: DeleteResult },
    { department: DeleteDepartmentInput }
  >(DELETE_DEPARTMENT_MUTATION, { department: payload });

  return response.deleteDepartment;
};
