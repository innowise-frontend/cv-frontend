import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  MultiSelect,
  isDateInRange,
  parseProjectDate,
  Textarea,
  toApiProjectDate,
} from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useProjectSkillsQuery, useUpdateProjectMutation } from "../../api";
import { getEnvironmentOptions, getSkillNamesFromSkillsData, ProjectFormValues } from "../shared";

interface UpdateProjectModalProps {
  projectId: string;
  initialValues: ProjectFormValues;
}

export const UpdateProjectModal = ({ projectId, initialValues }: UpdateProjectModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ProjectFormValues>({
    defaultValues: initialValues,
    mode: "onChange",
  });

  const watched = useWatch<ProjectFormValues>({ control }) ?? initialValues;
  const startDateLimit = parseProjectDate(watched.startDate);
  const endDateLimit = parseProjectDate(watched.endDate);
  const { data: skillsData } = useProjectSkillsQuery();

  const environmentOptions = useMemo(
    () =>
      getEnvironmentOptions(
        Array.from(
          new Set([...getSkillNamesFromSkillsData(skillsData), ...(watched.environment ?? [])]),
        ),
      ),
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
      name: data.name.trim(),
      domain: data.domain.trim(),
      description: data.description.trim(),
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
              {...register("name", {
                required: true,
                validate: (v) => v.trim().length > 0,
              })}
              value={watched.name}
            />
            <Input
              label={t("page.projects.domain")}
              placeholder={t("page.projects.domain")}
              {...register("domain", {
                required: true,
                validate: (v) => v.trim().length > 0,
              })}
              value={watched.domain}
            />
            <Textarea
              label={t("page.projects.description")}
              placeholder={t("page.projects.description")}
              {...register("description", {
                required: true,
                validate: (v) => v.trim().length > 0,
              })}
              value={watched.description}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="startDate"
                control={control}
                rules={{
                  required: true,
                  validate: (v) => {
                    const date = parseProjectDate(v);

                    return Boolean(date && isDateInRange(date, undefined, endDateLimit));
                  },
                }}
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
                rules={{
                  validate: (v) => {
                    if (!v.trim()) return true;

                    const date = parseProjectDate(v);

                    return Boolean(date && isDateInRange(date, startDateLimit, undefined));
                  },
                }}
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
              rules={{ required: true, validate: (value) => value.length > 0 }}
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
              disabled={!isValid || isPending}
            >
              {t("page.projects.update")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
