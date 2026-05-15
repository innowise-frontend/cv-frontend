import { UserRole } from "@root/services/graphql/__generated__/graphql";

export type CreateUserFormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
  role: UserRole;
};
