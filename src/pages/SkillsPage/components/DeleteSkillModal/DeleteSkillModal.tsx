import { useTranslation } from "react-i18next";
import { Button, Modal } from "@components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { DeleteSkillModalProps } from "./types";
import { useDeleteSkillMutation } from "../../api";

export const DeleteSkillModal = ({ name, id }: DeleteSkillModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const { mutateAsync } = useDeleteSkillMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.skills.delete")}
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>{t("page.skills.deleteSkill")}</Modal.Header>
        <Modal.Body>{t("page.skills.confirmDeleteSkill", { name })}</Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.skills.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            onClick={() => {
              mutateAsync({ skillId: id });
            }}
          >
            {t("page.skills.confirm")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
