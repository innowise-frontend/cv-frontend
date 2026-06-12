import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input, Modal, Textarea } from "@components/shared";
import { modalFormBodyClassName } from "@components/shared/formFieldStyles";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { UpdateCvModalProps } from "./types";
import { updateCvValidation, UpdateCvFormValues } from "./validation";
import { useUpdateCvMutation } from "../../api";

export const UpdateCvModal = ({ cvId, name, education, description }: UpdateCvModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  const validationSchema = useMemo(() => updateCvValidation(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<UpdateCvFormValues>({
    defaultValues: { name, education, description },
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const { mutate: updateCvMutation } = useUpdateCvMutation({
    onSuccess: () => {
      reset({ name, education, description });
      closeModal();
    },
  });

  const resetUpdatedCv = useCallback(() => {
    reset({ name, education, description });
  }, [reset, name, education, description]);

  const handleUpdateCv = (data: UpdateCvFormValues) => {
    updateCvMutation({
      cvId,
      name: data.name,
      education: data.education,
      description: data.description,
    });
  };

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.cvs.edit")}
      </Modal.Trigger>
      <Modal.Content className="w-[620px]" onCancel={resetUpdatedCv}>
        <Modal.Header>{t("page.cvs.editCv")}</Modal.Header>
        <form onSubmit={handleSubmit(handleUpdateCv)}>
          <Modal.Body className={modalFormBodyClassName}>
            <Input
              placeholder={t("page.cvs.name")}
              label={t("page.cvs.name")}
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              placeholder={t("page.cvs.education")}
              label={t("page.cvs.education")}
              {...register("education")}
              error={errors.education?.message}
            />
            <Textarea
              placeholder={t("page.cvs.description")}
              label={t("page.cvs.description")}
              className="h-43"
              {...register("description")}
              error={errors.description?.message}
            />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close variant="outline" className="w-40">
              {t("page.cvs.cancel")}
            </Modal.Close>
            <Button type="submit" variant="filled" className="w-40" disabled={!isValid}>
              {t("page.cvs.update")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
