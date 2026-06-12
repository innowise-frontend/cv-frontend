import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Modal } from "@components/shared";
import { modalFormBodyClassName } from "@components/shared/formFieldStyles";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { UpdateLanguageModalProps } from "./types";
import { useUpdateLanguageMutation } from "../../api";

export const UpdateLanguageModal = ({
  name,
  iso2,
  nativeName,
  languageId,
}: UpdateLanguageModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  const [updatedLanguage, setUpdatedLanguage] = useState({
    name,
    iso2,
    nativeName,
    languageId,
  });

  const { mutate } = useUpdateLanguageMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  const resetUpdatedLanguage = () => {
    setUpdatedLanguage({
      name,
      iso2,
      nativeName,
      languageId,
    });
  };

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.languages.edit")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetUpdatedLanguage}>
        <Modal.Header>{t("page.languages.updateLanguage")}</Modal.Header>
        <Modal.Body className={modalFormBodyClassName}>
          <Input
            placeholder={t("page.languages.name")}
            label={t("page.languages.name")}
            type="text"
            value={updatedLanguage.name}
            onChange={(e) => {
              setUpdatedLanguage({ ...updatedLanguage, name: e.target.value });
            }}
          />
          <Input
            placeholder={t("page.languages.iso")}
            label={t("page.languages.iso")}
            value={updatedLanguage.iso2}
            onChange={(e) => setUpdatedLanguage({ ...updatedLanguage, iso2: e.target.value })}
          />
          <Input
            placeholder={t("page.languages.nativeName")}
            label={t("page.languages.nativeName")}
            value={updatedLanguage.nativeName || ""}
            onChange={(e) => setUpdatedLanguage({ ...updatedLanguage, nativeName: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.languages.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            disabled={
              updatedLanguage.name === name &&
              updatedLanguage.iso2 === iso2 &&
              updatedLanguage.nativeName === nativeName
            }
            onClick={() => {
              mutate({
                native_name: updatedLanguage.nativeName,
                name: updatedLanguage.name,
                iso2: updatedLanguage.iso2,
                languageId: updatedLanguage.languageId,
              });
            }}
          >
            {t("page.languages.update")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
