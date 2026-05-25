import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Modal } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { UpdatePositionModalProps } from "./types";
import { useUpdatePositionMutation } from "../../api";

export const UpdatePositionModal = ({ name, positionId }: UpdatePositionModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  const [updatedName, setUpdatedName] = useState(name);

  const { mutate } = useUpdatePositionMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  const resetUpdatedName = () => {
    setUpdatedName(name);
  };

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.positions.edit")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetUpdatedName}>
        <Modal.Header>{t("page.positions.updatePosition")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-9">
          <Input
            placeholder={t("page.positions.position")}
            label={t("page.positions.position")}
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.positions.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            disabled={!updatedName.trim() || updatedName.trim() === name}
            onClick={() => {
              mutate({
                name: updatedName.trim(),
                positionId,
              });
            }}
          >
            {t("page.positions.update")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
