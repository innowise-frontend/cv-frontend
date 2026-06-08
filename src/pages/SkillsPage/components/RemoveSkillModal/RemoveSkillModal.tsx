import { useTranslation } from "react-i18next";
import { Modal } from "@components/shared";
import { ONE_ITEM } from "@root/pages/SkillsPage/const";
import { RemoveSkillModalProps } from "./types";

export const RemoveSkillModal = ({
  selectedNames,
  disabled = false,
  onRemove,
  onCancel,
}: RemoveSkillModalProps) => {
  const { t } = useTranslation();

  const selectedCount = selectedNames.length;
  const skillLabel = selectedCount === ONE_ITEM ? "page.skills.skill" : "page.skills.skills";

  const handleConfirm = async () => {
    await onRemove();
    onCancel();
  };

  return (
    <Modal>
      <Modal.Trigger variant="filled" className="w-40" disabled={disabled || selectedCount === 0}>
        {t("page.skills.remove")}
        {selectedCount !== 0 && (
          <span className="text-red bg-gray-8 rounded-full h-4 w-4 flex items-center justify-center">
            {selectedCount}
          </span>
        )}
      </Modal.Trigger>
      <Modal.Content onCancel={onCancel}>
        <Modal.Header>{t("page.skills.removeSkills")}</Modal.Header>
        <Modal.Body>
          <p className="text-left">
            <span>{t("page.skills.confirmRemove")} </span>
            <span className="font-bold">{selectedCount} </span>
            <span className="font-bold lowercase">{t(skillLabel)} </span>
            <span>?</span>
          </p>
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-4">
          <Modal.Close variant="outline" className="w-40">
            {t("page.skills.cancel")}
          </Modal.Close>
          <Modal.Close variant="filled" className="w-40" onClick={handleConfirm}>
            {t("page.skills.confirm")}
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
