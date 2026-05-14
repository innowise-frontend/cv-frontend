export interface UpdateUserModalProps {
  userId: string;
  email: string;
  departmentId: string;
  positionId: string;
  role: string;
  firstName: string;
  lastName: string;
}

export type UpdateUserFormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
  role: string;
};
