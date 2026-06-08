import { useState } from "react";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Button, Input, Modal } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useCreateDepartmentMutation } from "../../api";

export const CreateDepartmentModal = () => {
  const { t } = useTranslation();
  const [departmentName, setDepartmentName] = useState("");
  const { closeModal } = useModalContext();

  const { mutate } = useCreateDepartmentMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  const disabledButton = departmentName.trim().length === 0;

  return (
    <>
      <Modal.Trigger className="text-red font-medium dark:text-red">
        <PlusIcon height={16} width={16} />
        {t("page.departments.createDepartment").toUpperCase()}
      </Modal.Trigger>

      <Modal.Content onCancel={() => setDepartmentName("")}>
        <Modal.Header>{t("page.departments.createDepartment")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-9">
          <Input
            placeholder={t("page.departments.name")}
            label={t("page.departments.name")}
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
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
              mutate({ name: departmentName.trim() });
            }}
          >
            {t("page.departments.create").toUpperCase()}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
