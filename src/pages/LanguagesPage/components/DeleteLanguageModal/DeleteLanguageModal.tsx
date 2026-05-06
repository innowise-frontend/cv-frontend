import { useTranslation } from "react-i18next";
import { Modal } from "@components/shared";
import { DeleteLanguageModalProps } from "./types";
import { useDeleteLanguageMutation } from "../../api";

export const DeleteLanguageModal = ({ name, id }: DeleteLanguageModalProps) => {
  const { t } = useTranslation();
  const { mutateAsync } = useDeleteLanguageMutation();

  return (
    <Modal>
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
          <Modal.Close
            variant="filled"
            className="w-40"
            onClick={async () => {
              try {
                await mutateAsync({ languageId: id });

                return true;
              } catch {
                return false;
              }
            }}
          >
            {t("page.languages.confirm")}
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
