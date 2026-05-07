import { useTranslation } from "react-i18next";
import { Button, Modal } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { DeleteLanguageModalProps } from "./types";
import { useDeleteLanguageMutation } from "../../api";

export const DeleteLanguageModal = ({ name, id }: DeleteLanguageModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const { mutate } = useDeleteLanguageMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.languages.delete")}
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>{t("page.languages.deleteLanguage")}</Modal.Header>
        <Modal.Body>{t("page.languages.confirmDeleteLanguage", { name })}</Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.languages.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            onClick={() => {
              mutate({ languageId: id });
            }}
          >
            {t("page.languages.confirm")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
