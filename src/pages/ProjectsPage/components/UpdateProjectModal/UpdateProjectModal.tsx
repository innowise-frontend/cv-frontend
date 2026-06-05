import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  MultiSelect,
  parseProjectDate,
  Select,
  Textarea,
  toApiProjectDate,
} from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { getCvProjectDatePickerLimits } from "@pages/CvPage/components/CvProjects";
import {
  useProjectRoleOptionsQuery,
  useProjectSkillsQuery,
  useUpdateProjectMutation,
} from "../../api";
import { projectFormValidation } from "../projectFormValidation";
import { getEnvironmentOptions, getSkillNamesFromSkillsData } from "../utils";
import type { ProjectFormValues } from "../types";
import type { UpdateProjectModalProps } from "./types";

export const UpdateProjectModal = ({
  projectId,
  initialValues,
  disabled,
  nameAsSelect = false,
  showResponsibilities = false,
  showRoles = false,
  roleOptions = [],
  projectDateBounds,
  validationSchema: validationSchemaProp,
  onSubmit,
  isSubmitting: isSubmittingProp,
  headerTitle,
  submitLabel,
}: UpdateProjectModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const validationSchema = useMemo(
    () => validationSchemaProp ?? projectFormValidation(t),
    [t, validationSchemaProp],
  );
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm<ProjectFormValues>({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const watched = useWatch<ProjectFormValues>({ control }) ?? initialValues;
  const isCvProjectsPage = showResponsibilities;
  const shouldShowRoles = showResponsibilities || showRoles;
  const { data: fetchedRoleOptions = [] } = useProjectRoleOptionsQuery(shouldShowRoles);
  const resolvedRoleOptions = roleOptions.length > 0 ? roleOptions : fetchedRoleOptions;
  const formStartDateLimit = parseProjectDate(watched.startDate);
  const formEndDateLimit = parseProjectDate(watched.endDate);
  const { startDateMin, startDateMax, endDateMin, endDateMax } = getCvProjectDatePickerLimits(
    isCvProjectsPage ? projectDateBounds : undefined,
    watched.startDate,
    watched.endDate,
  );
  const isFieldDisabled = (field: keyof ProjectFormValues) => disabled?.[field] ?? false;
  const { data: skillsData } = useProjectSkillsQuery();

  const environmentOptions = useMemo(() => {
    if (nameAsSelect) {
      return (watched.environment ?? []).map((item) => ({ value: item, label: item }));
    }

    return getEnvironmentOptions([
      ...new Set([...getSkillNamesFromSkillsData(skillsData), ...(watched.environment ?? [])]),
    ]);
  }, [nameAsSelect, skillsData, watched.environment]);

  const nameOptions = useMemo(
    () => [{ value: initialValues.name, label: initialValues.name }],
    [initialValues.name],
  );

  const { mutate, isPending: isUpdatePending } = useUpdateProjectMutation({
    onSuccess: () => {
      reset(initialValues);
      closeModal();
    },
  });

  const isPending = isSubmittingProp ?? isUpdatePending;

  const resetToInitial = useCallback(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  useEffect(() => {
    resetToInitial();
  }, [projectId, resetToInitial]);

  const handleUpdateProject = (data: ProjectFormValues) => {
    if (onSubmit) {
      onSubmit(data, {
        close: closeModal,
        reset: resetToInitial,
      });

      return;
    }

    const startDate = toApiProjectDate(data.startDate);

    if (!startDate) return;

    mutate({
      projectId,
      name: data.name,
      domain: data.domain,
      description: data.description,
      start_date: startDate,
      end_date: toApiProjectDate(data.endDate) ?? null,
      environment: data.environment,
    });
  };

  const resolvedHeaderTitle = headerTitle ?? t("page.projects.updateProject");
  const resolvedSubmitLabel = submitLabel ?? t("page.projects.update");

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.projects.edit")}
      </Modal.Trigger>
      <Modal.Content className="w-[860px] min-w-[860px] max-w-[860px]" onCancel={resetToInitial}>
        <Modal.Header>{resolvedHeaderTitle}</Modal.Header>
        <form onSubmit={handleSubmit(handleUpdateProject)}>
          <Modal.Body className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {nameAsSelect ? (
                <Select
                  disablePortal
                  disabled={isFieldDisabled("name")}
                  label={t("page.projects.name")}
                  placeholder={t("page.projects.name")}
                  list={nameOptions}
                  value={initialValues.name}
                  onValueChange={() => undefined}
                />
              ) : (
                <Input
                  disabled={isFieldDisabled("name")}
                  label={t("page.projects.name")}
                  placeholder={t("page.projects.name")}
                  {...register("name")}
                  value={watched.name}
                />
              )}
              <Input
                disabled={isFieldDisabled("domain")}
                label={t("page.projects.domain")}
                placeholder={t("page.projects.domain")}
                {...register("domain")}
                value={watched.domain}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    disablePortal
                    disabled={isFieldDisabled("startDate")}
                    minDate={isCvProjectsPage ? startDateMin : undefined}
                    maxDate={isCvProjectsPage ? startDateMax : formEndDateLimit}
                    label={t("page.projects.startDate")}
                    placeholder={t("page.projects.startDate")}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    disablePortal
                    disabled={isFieldDisabled("endDate")}
                    minDate={isCvProjectsPage ? endDateMin : formStartDateLimit}
                    maxDate={isCvProjectsPage ? endDateMax : undefined}
                    label={t("page.projects.endDate")}
                    placeholder={t("page.projects.endDate")}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
            <Textarea
              disabled={isFieldDisabled("description")}
              label={t("page.projects.description")}
              placeholder={t("page.projects.description")}
              {...register("description")}
              value={watched.description}
            />
            <Controller
              name="environment"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  disablePortal
                  disabled={isFieldDisabled("environment")}
                  label={t("page.projects.environment")}
                  placeholder={t("page.projects.environment")}
                  data={field.value}
                  options={environmentOptions}
                  onChange={field.onChange}
                />
              )}
            />
            {shouldShowRoles && (
              <Controller
                name="roles"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    disablePortal
                    disabled={isFieldDisabled("roles")}
                    label={t("page.projects.roles")}
                    placeholder={t("page.projects.roles")}
                    data={field.value}
                    options={resolvedRoleOptions}
                    onChange={field.onChange}
                  />
                )}
              />
            )}
            {showResponsibilities && (
              <Input
                disabled={isFieldDisabled("responsibilities")}
                label={t("page.cvs.projects.responsibilities")}
                placeholder={t("page.cvs.projects.responsibilities")}
                {...register("responsibilities")}
                value={watched.responsibilities ?? ""}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close
              type="button"
              variant="outline"
              className="w-40"
              onClick={() => {
                resetToInitial();
                closeModal();
              }}
            >
              {t("page.projects.cancel")}
            </Modal.Close>
            <Button
              type="submit"
              variant="filled"
              className="w-40"
              disabled={!isValid || !isDirty || isPending}
            >
              {resolvedSubmitLabel}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
