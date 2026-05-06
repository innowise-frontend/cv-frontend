import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Modal } from "@components/shared";
import { UpdateLanguageInput } from "@services/graphql/__generated__/graphql";
import { UpdateLanguageModalProps } from "./types";
import { useUpdateLanguageMutation } from "../../api";

export const UpdateLanguageModal = ({ name, iso2, native_name }: UpdateLanguageModalProps) => {
  const { t } = useTranslation();
  const [updatedLanguage, setUpdatedLanguage] = useState({
    name: name,
    iso2: iso2,
    native_name: native_name,
  });

  const { mutateAsync } = useUpdateLanguageMutation();

  const resetUpdatedLanguage = () => {
    setUpdatedLanguage({
      name: name,
      iso2: iso2,
      native_name: native_name,
    });
  };

  return (
    <Modal>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.languages.edit")}
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>{t("page.languages.updateLanguage")}</Modal.Header>
        <Modal.Body>
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
            value={updatedLanguage.native_name || ""}
            onChange={(e) =>
              setUpdatedLanguage({ ...updatedLanguage, native_name: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40" onClick={resetUpdatedLanguage}>
            {t("page.languages.cancel")}
          </Modal.Close>
          <Modal.Close
            variant="filled"
            className="w-40"
            disabled={
              updatedLanguage.name === name &&
              updatedLanguage.iso2 === iso2 &&
              updatedLanguage.native_name === native_name
            }
            onClick={async () => {
              try {
                await mutateAsync(updatedLanguage as UpdateLanguageInput);

                return true;
              } catch {
                return false;
              }
            }}
          >
            {t("page.languages.update")}
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
