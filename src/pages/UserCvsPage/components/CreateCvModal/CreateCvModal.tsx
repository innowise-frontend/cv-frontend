import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Button, Input, Modal, Textarea } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useAuth } from "@root/hooks";
import { CreateCvFormValues, createCvValidation } from "./validation";
import { useCreateCvMutation } from "../../api";

const defaultFormValues: CreateCvFormValues = {
  name: "",
  education: "",
  description: "",
};

export const CreateCvModal = () => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const { closeModal } = useModalContext();
  const validationSchema = useMemo(() => createCvValidation(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<CreateCvFormValues>({
    defaultValues: defaultFormValues,
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const { mutate: createCvMutation } = useCreateCvMutation({
    onSuccess: () => {
      reset(defaultFormValues);
      closeModal();
    },
  });

  const resetCreatedCv = useCallback(() => {
    reset(defaultFormValues);
  }, [reset]);

  const handleCreateCv = (data: CreateCvFormValues) => {
    createCvMutation({
      name: data.name,
      education: data.education,
      description: data.description,
      userId,
    });
  };

  return (
    <>
      <Modal.Trigger className="text-red font-medium dark:text-red">
        <PlusIcon height={16} width={16} />
        {t("page.cvs.createCv")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetCreatedCv}>
        <Modal.Header>{t("page.cvs.createCv")}</Modal.Header>
        <form onSubmit={handleSubmit(handleCreateCv)}>
          <Modal.Body className="flex flex-col gap-9">
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
              {...register("description")}
              error={errors.description?.message}
            />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close variant="outline" className="w-40">
              {t("page.cvs.cancel")}
            </Modal.Close>
            <Button type="submit" variant="filled" className="w-40" disabled={!isValid}>
              {t("page.cvs.create")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
