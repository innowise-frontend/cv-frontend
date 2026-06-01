import { useTranslation } from "react-i18next";
import { Button, Modal } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useDeleteProjectMutation } from "../../api";

interface DeleteProjectModalProps {
  projectId: string;
  name: string;
}

export const DeleteProjectModal = ({ projectId, name }: DeleteProjectModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const { mutate, isPending } = useDeleteProjectMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.projects.delete")}
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>{t("page.projects.deleteProject")}</Modal.Header>
        <Modal.Body>{t("page.projects.confirmDeleteProject", { name })}</Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.projects.cancel")}
          </Modal.Close>
          <Button
            type="button"
            variant="filled"
            className="w-40"
            disabled={isPending}
            onClick={() => {
              mutate({ projectId });
            }}
          >
            {t("page.projects.confirm")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
