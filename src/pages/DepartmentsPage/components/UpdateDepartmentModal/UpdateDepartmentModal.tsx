import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Modal } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useUpdateDepartmentMutation } from "../../api";
import type { UpdateDepartmentModalProps } from "./types";

export const UpdateDepartmentModal = ({ departmentId, name }: UpdateDepartmentModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const [updatedDepartmentName, setUpdatedDepartmentName] = useState(name);

  const { mutate } = useUpdateDepartmentMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  const disabledButton = !updatedDepartmentName.trim().length || updatedDepartmentName === name;

  const resetUpdatedDepartment = () => {
    setUpdatedDepartmentName(name);
  };

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.departments.edit")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetUpdatedDepartment}>
        <Modal.Header>{t("page.departments.updateDepartment")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-9">
          <Input
            placeholder={t("page.departments.name")}
            label={t("page.departments.name")}
            type="text"
            value={updatedDepartmentName}
            onChange={(e) => setUpdatedDepartmentName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.departments.cancel").toUpperCase()}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            disabled={disabledButton}
            onClick={() => {
              mutate({
                departmentId,
                name: updatedDepartmentName.trim(),
              });
            }}
          >
            {t("page.departments.update").toUpperCase()}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
