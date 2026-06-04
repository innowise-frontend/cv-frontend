export interface ProjectFormValues {
  name: string;
  domain: string;
  description: string;
  startDate: string;
  endDate: string;
  environment: string[];
}

export const defaultProjectFormValues: ProjectFormValues = {
  name: "",
  domain: "",
  description: "",
  startDate: "",
  endDate: "",
  environment: [],
};
