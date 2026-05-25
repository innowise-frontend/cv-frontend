import { useTranslation } from "react-i18next";
import { Button, Modal } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { DeletePositionModalProps } from "./types";
import { useDeletePositionMutation } from "../../api";

export const DeletePositionModal = ({ name, id }: DeletePositionModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const { mutate } = useDeletePositionMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.positions.delete")}
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>{t("page.positions.deletePosition")}</Modal.Header>
        <Modal.Body>{t("page.positions.confirmDeletePosition", { name })}</Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.positions.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            onClick={() => {
              mutate({ positionId: id });
            }}
          >
            {t("page.positions.confirm")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
