import { useState } from "react";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Button, Input, Modal } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useCreatePositionMutation, usePositionsQuery } from "../../api";

export const CreatePositionModal = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  const { closeModal } = useModalContext();

  const resetName = () => {
    setName("");
  };

  const { mutate } = useCreatePositionMutation({
    onSuccess: () => {
      closeModal();
      resetName();
    },
  });

  const { data } = usePositionsQuery();

  const disabledButton = !name.trim() || (data?.some((item) => item.name === name.trim()) ?? false);

  return (
    <>
      <Modal.Trigger className="text-red font-medium dark:text-red">
        <PlusIcon height={16} width={16} />
        {t("page.positions.createPosition")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetName}>
        <Modal.Header>{t("page.positions.createPosition")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-9">
          <Input
            placeholder={t("page.positions.position")}
            label={t("page.positions.position")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.positions.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            disabled={disabledButton}
            onClick={() => {
              mutate({ name: name.trim() });
            }}
          >
            {t("page.positions.add")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
