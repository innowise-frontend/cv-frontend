import type { cvAddProjectFormValidation } from "@pages/CvPage/components/CvProjects/cvProjectFormValidation";
import type { ProjectsQuery } from "@services/graphql/__generated__/graphql";
import type { projectFormValidation } from "../projectFormValidation";
import type { ProjectFormDisabledFields, ProjectFormValues } from "../types";

export type ProjectCatalogItem = ProjectsQuery["projects"]["items"][number];

export type ProjectFormValidationSchema =
  | ReturnType<typeof projectFormValidation>
  | ReturnType<typeof cvAddProjectFormValidation>;

export interface CreateProjectModalProps {
  disabled?: ProjectFormDisabledFields;
  defaultValues?: ProjectFormValues;
  nameAsSelect?: boolean;
  nameSelectOptions?: { value: string; label: string }[];
  catalogItems?: ProjectCatalogItem[];
  showResponsibilities?: boolean;
  validationSchema?: ProjectFormValidationSchema;
  onSubmit?: (data: ProjectFormValues, helpers: { close: () => void; reset: () => void }) => void;
  isSubmitting?: boolean;
  headerTitle?: string;
  submitLabel?: string;
  triggerLabel?: string;
}
