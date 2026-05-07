import { useTranslation } from "react-i18next";
import { Button, Modal } from "@components/shared";
import { useAuth } from "@root/hooks";
import { RemoveLanguageModalProps } from "./types";
import { useDeleteProfileLanguagesMutation } from "../../api";

export const RemoveLanguageModal = ({
  deletedLanguages,
  onChangeDeletedLanguages,
  onChangeMode,
}: RemoveLanguageModalProps) => {
  const { t } = useTranslation();
  const { userId } = useAuth();

  const resetDeletedLanguages = () => {
    onChangeMode(false);
    onChangeDeletedLanguages({ userId, name: [] });
  };

  const { mutate } = useDeleteProfileLanguagesMutation(userId);

  const selectedCount = deletedLanguages.name.length;
  const languageLabel =
    selectedCount === 1 ? "page.languages.language" : "page.languages.languages";

  return (
    <Modal>
      <Modal.Trigger variant="filled" className="w-40" disabled={selectedCount === 0}>
        {t("page.languages.remove")}
        {selectedCount !== 0 && (
          <span className="text-red bg-gray-8 rounded-full h-4 w-4 flex items-center justify-center">
            {selectedCount}
          </span>
        )}
      </Modal.Trigger>
      <Modal.Content onCancel={resetDeletedLanguages}>
        <Modal.Header>{t("page.languages.removeLanguage")}</Modal.Header>
        <Modal.Body>
          <p className="text-left">
            <span>{t("page.languages.confirmRemove")} </span>
            <span className="font-bold">{selectedCount} </span>
            <span className="font-bold lowercase">{t(languageLabel)} </span>
            <span>?</span>
          </p>
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-4">
          <Modal.Close variant="outline" className="w-40">
            {t("page.languages.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            onClick={() => {
              mutate(deletedLanguages);
            }}
          >
            {t("page.languages.confirm")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
