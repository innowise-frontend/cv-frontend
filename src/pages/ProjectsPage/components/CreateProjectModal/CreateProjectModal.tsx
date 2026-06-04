import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  MultiSelect,
  formatProjectDateDisplay,
  parseProjectDate,
  Select,
  Textarea,
  toApiProjectDate,
} from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { getCvProjectDatePickerLimits } from "@pages/CvPage/components/CvProjects/cvProjectDateLimits";
import {
  cvAddProjectFormValidation,
  type CvProjectDateBounds,
} from "@pages/CvPage/components/CvProjects/cvProjectFormValidation";
import { useDynamicZodResolver } from "@pages/CvPage/components/CvProjects/useDynamicZodResolver";
import { useCreateProjectMutation, useProjectSkillsQuery } from "../../api";
import { projectFormValidation } from "../projectFormValidation";
import { defaultProjectFormValues, type ProjectFormValues } from "../types";
import { getEnvironmentOptions, getSkillNamesFromSkillsData } from "../utils";
import type { CreateProjectModalProps } from "./types";

export const CreateProjectModal = ({
  disabled,
  defaultValues = defaultProjectFormValues,
  nameAsSelect = false,
  nameSelectOptions = [],
  catalogItems = [],
  showResponsibilities = false,
  validationSchema: validationSchemaProp,
  onSubmit,
  isSubmitting: isSubmittingProp,
  headerTitle,
  submitLabel,
  triggerLabel,
}: CreateProjectModalProps = {}) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const isCvProjectsPage = showResponsibilities;
  const { resolver: cvResolver, setSchema } = useDynamicZodResolver(cvAddProjectFormValidation());

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm<ProjectFormValues>({
    defaultValues,
    mode: "onChange",
    resolver: isCvProjectsPage
      ? cvResolver
      : zodResolver(validationSchemaProp ?? projectFormValidation(t)),
  });

  const watched = useWatch<ProjectFormValues>({ control }) ?? defaultValues;

  const selectedCatalogProject = useMemo(
    () => catalogItems.find((item) => item.id === watched.name),
    [catalogItems, watched.name],
  );

  const projectDateBounds = useMemo((): CvProjectDateBounds | undefined => {
    if (!isCvProjectsPage || !selectedCatalogProject) return undefined;

    return {
      startDate: selectedCatalogProject.start_date,
      endDate: selectedCatalogProject.end_date,
    };
  }, [isCvProjectsPage, selectedCatalogProject]);

  const validationSchema = useMemo(() => {
    if (isCvProjectsPage) {
      return cvAddProjectFormValidation(projectDateBounds);
    }

    return validationSchemaProp ?? projectFormValidation(t);
  }, [isCvProjectsPage, projectDateBounds, t, validationSchemaProp]);

  const previousBoundsKey = useRef<string | null>(null);
  const boundsKey = projectDateBounds
    ? `${projectDateBounds.startDate ?? ""}-${projectDateBounds.endDate ?? ""}`
    : null;

  useEffect(() => {
    if (!isCvProjectsPage) return;

    setSchema(validationSchema);

    if (boundsKey === previousBoundsKey.current) return;

    previousBoundsKey.current = boundsKey;
    void trigger(["startDate", "endDate"]);
  }, [boundsKey, isCvProjectsPage, setSchema, trigger, validationSchema]);

  const { startDateMin, startDateMax, endDateMin, endDateMax } = getCvProjectDatePickerLimits(
    isCvProjectsPage ? projectDateBounds : undefined,
    watched.startDate,
    watched.endDate,
  );
  const isFieldDisabled = (field: keyof ProjectFormValues) => disabled?.[field] ?? false;

  const { mutate, isPending: isCreatePending } = useCreateProjectMutation({
    onSuccess: () => {
      reset(defaultValues);
      closeModal();
    },
  });

  const isPending = isSubmittingProp ?? isCreatePending;

  const { data: skillsData } = useProjectSkillsQuery();
  const environmentOptions = useMemo(() => {
    if (nameAsSelect) {
      return (watched.environment ?? []).map((item) => ({ value: item, label: item }));
    }

    return getEnvironmentOptions(getSkillNamesFromSkillsData(skillsData));
  }, [nameAsSelect, skillsData, watched.environment]);

  useEffect(() => {
    if (!nameAsSelect) return;

    const selected = catalogItems.find((item) => item.id === watched.name);

    if (!selected) {
      setValue("domain", "");
      setValue("description", "");
      setValue("environment", []);
      setValue("startDate", "");
      setValue("endDate", "");

      return;
    }

    setValue("domain", selected.domain ?? "");
    setValue("description", selected.description ?? "");
    setValue("environment", selected.environment ?? []);
    setValue("startDate", formatProjectDateDisplay(selected.start_date));
    setValue("endDate", formatProjectDateDisplay(selected.end_date));
  }, [catalogItems, nameAsSelect, setValue, watched.name]);

  const handleCreateProject = (data: ProjectFormValues) => {
    if (onSubmit) {
      onSubmit(data, {
        close: closeModal,
        reset: () => reset(defaultValues),
      });

      return;
    }

    const startDate = toApiProjectDate(data.startDate);

    if (!startDate) return;

    mutate({
      name: data.name,
      domain: data.domain,
      description: data.description,
      start_date: startDate,
      end_date: toApiProjectDate(data.endDate) ?? null,
      environment: data.environment,
    });
  };

  const resolvedHeaderTitle = headerTitle ?? t("page.projects.createProject");
  const resolvedSubmitLabel = submitLabel ?? t("page.projects.create");
  const resolvedTriggerLabel = triggerLabel ?? t("page.projects.createProject");

  return (
    <>
      <Modal.Trigger className="text-red font-medium dark:text-red">
        <PlusIcon height={16} width={16} />
        {resolvedTriggerLabel}
      </Modal.Trigger>
      <Modal.Content
        className="w-[860px] min-w-[860px] max-w-[860px]"
        onCancel={() => reset(defaultValues)}
      >
        <Modal.Header>{resolvedHeaderTitle}</Modal.Header>
        <form onSubmit={handleSubmit(handleCreateProject)}>
          <Modal.Body className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {nameAsSelect ? (
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disablePortal
                      disabled={isFieldDisabled("name")}
                      label={t("page.projects.name")}
                      placeholder={t("page.projects.name")}
                      list={nameSelectOptions}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
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
                    maxDate={isCvProjectsPage ? startDateMax : parseProjectDate(watched.endDate)}
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
                    minDate={isCvProjectsPage ? endDateMin : parseProjectDate(watched.startDate)}
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
            <Modal.Close variant="outline" className="w-40">
              {t("page.projects.cancel")}
            </Modal.Close>
            <Button
              type="submit"
              variant="filled"
              className="w-40"
              disabled={!isValid || isPending || (nameAsSelect && nameSelectOptions.length === 0)}
            >
              {resolvedSubmitLabel}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
