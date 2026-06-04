export interface ProjectFormValues {
  name: string;
  domain: string;
  description: string;
  startDate: string;
  endDate: string;
  environment: string[];
  responsibilities?: string;
}

export type ProjectFormDisabledFields = Partial<Record<keyof ProjectFormValues, boolean>>;

export const defaultProjectFormValues: ProjectFormValues = {
  name: "",
  domain: "",
  description: "",
  startDate: "",
  endDate: "",
  environment: [],
  responsibilities: "",
};
