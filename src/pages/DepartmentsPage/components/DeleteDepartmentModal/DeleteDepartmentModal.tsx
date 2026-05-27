import { useTranslation } from "react-i18next";
import { Button, Modal } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useDeleteDepartmentMutation } from "../../api";
import type { DeleteDepartmentModalProps } from "./types";

export const DeleteDepartmentModal = ({ departmentId, name }: DeleteDepartmentModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  const { mutate } = useDeleteDepartmentMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.departments.delete")}
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>{t("page.departments.deleteDepartment")}</Modal.Header>
        <Modal.Body>{t("page.departments.confirmDeleteDepartment", { name })}</Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.departments.cancel").toUpperCase()}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            onClick={() => {
              mutate({ departmentId });
            }}
          >
            {t("page.departments.confirm").toUpperCase()}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
