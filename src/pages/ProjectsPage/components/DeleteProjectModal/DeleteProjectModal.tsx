import { useTranslation } from "react-i18next";
import { Button, Modal } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useDeleteProjectMutation } from "../../api";
import type { DeleteProjectModalProps } from "./types";

export const DeleteProjectModal = ({
  projectId,
  name,
  onConfirm,
  isSubmitting: isSubmittingProp,
  headerTitle,
  bodyText,
  confirmLabel,
}: DeleteProjectModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const { mutate, isPending: isDeletePending } = useDeleteProjectMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  const isPending = isSubmittingProp ?? isDeletePending;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(projectId, { close: closeModal });

      return;
    }

    mutate({ projectId });
  };

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.projects.delete")}
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>{headerTitle ?? t("page.projects.deleteProject")}</Modal.Header>
        <Modal.Body>{bodyText ?? t("page.projects.confirmDeleteProject", { name })}</Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.projects.cancel")}
          </Modal.Close>
          <Button
            type="button"
            variant="filled"
            className="w-40"
            disabled={isPending}
            onClick={handleConfirm}
          >
            {confirmLabel ?? t("page.projects.confirm")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
