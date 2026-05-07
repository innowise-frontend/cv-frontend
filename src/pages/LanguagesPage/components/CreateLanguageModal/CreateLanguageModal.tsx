import { useState } from "react";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Input, Modal } from "@components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { useCreateLanguageMutation } from "../../api";

export const CreateLanguageModal = () => {
  const { t } = useTranslation();
  const [createdLanguage, setCreatedLanguage] = useState({
    name: "",
    iso2: "",
    nativeName: "",
  });

  const { closeModal } = useModalContext();

  const resetCreatedLanguage = () => {
    setCreatedLanguage({
      name: "",
      iso2: "",
      nativeName: "",
    });
  };

  const { mutateAsync } = useCreateLanguageMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  return (
    <>
      <Modal.Trigger className="text-red font-medium">
        <PlusIcon height={16} width={16} />
        {t("page.languages.createLanguage")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetCreatedLanguage}>
        <Modal.Header>{t("page.languages.createLanguage")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <Input
            placeholder={t("page.languages.name")}
            label={t("page.languages.name")}
            value={createdLanguage.name}
            onChange={(e) => setCreatedLanguage({ ...createdLanguage, name: e.target.value })}
          />
          <Input
            placeholder={t("page.languages.iso")}
            label={t("page.languages.iso")}
            value={createdLanguage.iso2}
            onChange={(e) => setCreatedLanguage({ ...createdLanguage, iso2: e.target.value })}
          />
          <Input
            placeholder={t("page.languages.nativeName")}
            label={t("page.languages.nativeName")}
            value={createdLanguage.nativeName}
            onChange={(e) => setCreatedLanguage({ ...createdLanguage, nativeName: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40" onClick={resetCreatedLanguage}>
            {t("page.languages.cancel")}
          </Modal.Close>
          <Modal.Close
            variant="filled"
            className="w-40"
            disabled={!createdLanguage.name || !createdLanguage.iso2 || !createdLanguage.nativeName}
            onClick={() => {
              mutateAsync({
                name: createdLanguage.name,
                iso2: createdLanguage.iso2,
                native_name: createdLanguage.nativeName,
              });
            }}
          >
            {t("page.languages.add")}
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
