import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Modal } from "@components/shared";
import { useAuth } from "@root/hooks";
import { DeleteProfileLanguageInput } from "@services/graphql/__generated__/graphql";
import { deleteProfileLanguages } from "@services/languages";

interface DeleteLanguageModalProps {
  deletedLanguages: DeleteProfileLanguageInput;
  onChangeDeletedLanguages: (value: DeleteProfileLanguageInput) => void;
  onChangeMode: (mode: boolean) => void;
}

export const DeleteLanguageModal = ({
  deletedLanguages,
  onChangeDeletedLanguages,
  onChangeMode,
}: DeleteLanguageModalProps) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const resetDeletedLanguages = () => {
    onChangeMode(false);
    onChangeDeletedLanguages({ userId, name: [] });
  };

  const { mutate } = useMutation({
    mutationFn: deleteProfileLanguages,
    onSuccess: async () => {
      resetDeletedLanguages();
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  const selectedCount = deletedLanguages.name.length;
  const languageLabel =
    selectedCount === 1 ? t("page.languages.language") : t("page.languages.languages");

  return (
    <Modal>
      <Modal.Trigger variant="filled" className="w-40" disabled={selectedCount === 0}>
        {t("page.languages.delete")}
        {selectedCount !== 0 && (
          <span className="text-red bg-gray-8 rounded-full h-4 w-4 flex items-center justify-center">
            {selectedCount}
          </span>
        )}
      </Modal.Trigger>
      <Modal.Content onCancel={resetDeletedLanguages}>
        <Modal.Header onCancel={resetDeletedLanguages}>
          {t("page.languages.removeLanguage")}
        </Modal.Header>
        <Modal.Body>
          <p className="text-left">
            {t("page.languages.confirmRemove", { count: selectedCount, languageLabel })}
          </p>
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-4">
          <Modal.Close variant="outline" className="w-40" onClick={resetDeletedLanguages}>
            {t("page.languages.cancel")}
          </Modal.Close>
          <Modal.Close variant="filled" className="w-40" onClick={() => mutate(deletedLanguages)}>
            {t("page.languages.remove")}
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
