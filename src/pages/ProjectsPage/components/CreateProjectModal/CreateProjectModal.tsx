import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
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
import { useCreateProjectMutation, useProjectSkillsQuery } from "../../api";
import { projectFormValidation } from "../projectFormValidation";
import { ProjectFormValues, defaultProjectFormValues } from "../types";
import { getEnvironmentOptions, getSkillNamesFromSkillsData } from "../utils";

export const CreateProjectModal = () => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const validationSchema = useMemo(() => projectFormValidation(t), [t]);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ProjectFormValues>({
    defaultValues: defaultProjectFormValues,
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const watched = useWatch<ProjectFormValues>({ control }) ?? defaultProjectFormValues;
  const startDateLimit = parseProjectDate(watched.startDate);
  const endDateLimit = parseProjectDate(watched.endDate);

  const { mutate, isPending } = useCreateProjectMutation({
    onSuccess: () => {
      reset(defaultProjectFormValues);
      closeModal();
    },
  });

  const { data: skillsData } = useProjectSkillsQuery();
  const environmentOptions = useMemo(
    () => getEnvironmentOptions(getSkillNamesFromSkillsData(skillsData)),
    [skillsData],
  );

  const handleCreateProject = (data: ProjectFormValues) => {
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

  return (
    <>
      <Modal.Trigger className="text-red font-medium dark:text-red">
        <PlusIcon height={16} width={16} />
        {t("page.projects.createProject")}
      </Modal.Trigger>
      <Modal.Content onCancel={() => reset(defaultProjectFormValues)}>
        <Modal.Header>{t("page.projects.createProject")}</Modal.Header>
        <form onSubmit={handleSubmit(handleCreateProject)}>
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
            <Modal.Close variant="outline" className="w-40">
              {t("page.projects.cancel")}
            </Modal.Close>
            <Button
              type="submit"
              variant="filled"
              className="w-40"
              disabled={!isValid || isPending}
            >
              {t("page.projects.create")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
