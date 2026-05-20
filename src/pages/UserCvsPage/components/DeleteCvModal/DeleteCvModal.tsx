import { useTranslation } from "react-i18next";
import { Button, Modal } from "@root/components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { DeleteCvModalProps } from "./types";
import { useDeleteCvMutation } from "../../api";

export const DeleteCvModal = ({ name, cvId }: DeleteCvModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const { mutate } = useDeleteCvMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.cvs.delete")}
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>{t("page.cvs.deleteCv")}</Modal.Header>
        <Modal.Body>{t("page.cvs.confirmDeleteCv", { name })}</Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.cvs.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            onClick={() => {
              mutate({ cvId });
            }}
          >
            {t("page.cvs.confirm")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
