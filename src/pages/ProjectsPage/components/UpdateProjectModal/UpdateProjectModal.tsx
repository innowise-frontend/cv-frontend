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
  Textarea,
  toApiProjectDate,
} from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useProjectSkillsQuery, useUpdateProjectMutation } from "../../api";
import { projectFormValidation } from "../projectFormValidation";
import { ProjectFormValues } from "../types";
import { getEnvironmentOptions, getSkillNamesFromSkillsData } from "../utils";
import { UpdateProjectModalProps } from "./types";

export const UpdateProjectModal = ({ projectId, initialValues }: UpdateProjectModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const validationSchema = useMemo(() => projectFormValidation(t), [t]);
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
  const startDateLimit = parseProjectDate(watched.startDate);
  const endDateLimit = parseProjectDate(watched.endDate);
  const { data: skillsData } = useProjectSkillsQuery();

  const environmentOptions = useMemo(
    () =>
      getEnvironmentOptions([
        ...new Set([...getSkillNamesFromSkillsData(skillsData), ...(watched.environment ?? [])]),
      ]),
    [skillsData, watched.environment],
  );

  const { mutate, isPending } = useUpdateProjectMutation({
    onSuccess: () => {
      reset(initialValues);
      closeModal();
    },
  });

  const resetToInitial = useCallback(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  useEffect(() => {
    resetToInitial();
  }, [projectId, resetToInitial]);

  const handleUpdateProject = (data: ProjectFormValues) => {
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

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.projects.edit")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetToInitial}>
        <Modal.Header>{t("page.projects.updateProject")}</Modal.Header>
        <form onSubmit={handleSubmit(handleUpdateProject)}>
          <Modal.Body className="flex flex-col gap-6">
            <Input
              label={t("page.projects.name")}
              placeholder={t("page.projects.name")}
              {...register("name")}
              value={watched.name}
            />
            <Input
              label={t("page.projects.domain")}
              placeholder={t("page.projects.domain")}
              {...register("domain")}
              value={watched.domain}
            />
            <Textarea
              label={t("page.projects.description")}
              placeholder={t("page.projects.description")}
              {...register("description")}
              value={watched.description}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    disablePortal
                    maxDate={endDateLimit}
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
                    minDate={startDateLimit}
                    label={t("page.projects.endDate")}
                    placeholder={t("page.projects.endDate")}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
            <Controller
              name="environment"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  disablePortal
                  label={t("page.projects.environment")}
                  placeholder={t("page.projects.environment")}
                  data={field.value}
                  options={environmentOptions}
                  onChange={field.onChange}
                />
              )}
            />
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
              {t("page.projects.update")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
