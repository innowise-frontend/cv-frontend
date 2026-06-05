import type { ProjectFormValues } from "@pages/ProjectsPage/components/types";
import { buildAddCvProjectPayload, buildUpdateCvProjectPayload } from "./payloads";

type AddCvProjectPayload = NonNullable<ReturnType<typeof buildAddCvProjectPayload>>;
type UpdateCvProjectPayload = NonNullable<ReturnType<typeof buildUpdateCvProjectPayload>>;
type ProjectModalSubmitHelpers = { close: () => void; reset: () => void };

export const createAddCvProjectSubmitHandler =
  (
    cvId: string,
    addCvProject: (payload: AddCvProjectPayload, options?: { onSuccess?: () => void }) => void,
  ) =>
  (data: ProjectFormValues, { close, reset }: ProjectModalSubmitHelpers) => {
    const payload = buildAddCvProjectPayload(cvId, data);

    if (!payload) return;

    addCvProject(payload, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };

export const createUpdateCvProjectSubmitHandler =
  (
    cvId: string,
    projectId: string,
    updateCvProject: (
      payload: UpdateCvProjectPayload,
      options?: { onSuccess?: () => void },
    ) => void,
  ) =>
  (data: ProjectFormValues, { close, reset }: ProjectModalSubmitHelpers) => {
    const payload = buildUpdateCvProjectPayload(cvId, projectId, data);

    if (!payload) return;

    updateCvProject(payload, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };
