import type { CvProjectDateBounds } from "@pages/CvPage/components/CvProjects";
import type { cvUpdateProjectFormValidation } from "@pages/CvPage/components/CvProjects/utils";
import type { projectFormValidation } from "../projectFormValidation";
import type { ProjectFormDisabledFields, ProjectFormValues } from "../types";

export type ProjectFormValidationSchema =
  | ReturnType<typeof projectFormValidation>
  | ReturnType<typeof cvUpdateProjectFormValidation>;

export interface UpdateProjectModalProps {
  projectId: string;
  initialValues: ProjectFormValues;
  disabled?: ProjectFormDisabledFields;
  nameAsSelect?: boolean;
  showResponsibilities?: boolean;
  showRoles?: boolean;
  roleOptions?: { value: string; label: string }[];
  projectDateBounds?: CvProjectDateBounds;
  validationSchema?: ProjectFormValidationSchema;
  onSubmit?: (data: ProjectFormValues, helpers: { close: () => void; reset: () => void }) => void;
  isSubmitting?: boolean;
  headerTitle?: string;
  submitLabel?: string;
}
