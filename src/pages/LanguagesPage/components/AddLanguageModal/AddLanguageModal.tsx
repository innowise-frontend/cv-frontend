import { useState } from "react";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Button, Modal, Select } from "@components/shared";
import { modalFormBodyClassName } from "@components/shared/formFieldStyles";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { AddProfileLanguageInput, Proficiency } from "@services/graphql/__generated__/graphql";
import { AddLanguageModalProps } from "./types";
import { useAddProfileLanguageMutation, useUserLanguagesQuery } from "../../api";

export const AddLanguageModal = ({
  userId,
  languageOptions,
  proficiencyOptions,
}: AddLanguageModalProps) => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<AddProfileLanguageInput>({
    userId,
    name: "",
    proficiency: "" as Proficiency,
  });

  const { closeModal } = useModalContext();

  const resetSelectedLanguage = () => {
    setSelectedLanguage({ userId, name: "", proficiency: "" as Proficiency });
  };

  const { mutate } = useAddProfileLanguageMutation(userId, {
    onSuccess: () => {
      closeModal();
    },
  });

  const { data } = useUserLanguagesQuery(userId, { enabled: !!userId });

  const disabledButton =
    !userId ||
    !selectedLanguage.name ||
    !selectedLanguage.proficiency ||
    (data?.languages?.some((item) => item.name === selectedLanguage.name) ?? false);

  const handleAddLanguage = () => {
    mutate({ ...selectedLanguage, userId });
  };

  return (
    <>
      <Modal.Trigger
        variant="ghost"
        className="w-40 uppercase text-gray-3 p-4 flex items-center justify-center gap-2"
      >
        <PlusIcon />
        {t("page.languages.addLanguage")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetSelectedLanguage}>
        <Modal.Header className="">{t("page.languages.addLanguage")}</Modal.Header>
        <Modal.Body className={modalFormBodyClassName}>
          <Select
            list={languageOptions}
            label={t("page.languages.language")}
            placeholder={t("page.languages.language")}
            value={selectedLanguage.name}
            onValueChange={(value) => setSelectedLanguage({ ...selectedLanguage, name: value })}
          />
          <Select
            list={proficiencyOptions}
            label={t("page.languages.proficiency")}
            placeholder={t("page.languages.proficiency")}
            value={selectedLanguage.proficiency}
            onValueChange={(value) =>
              setSelectedLanguage({
                ...selectedLanguage,
                proficiency: value as Proficiency,
              })
            }
          />
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-4">
          <Modal.Close variant="outline" className="w-40">
            {t("page.languages.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            disabled={disabledButton}
            onClick={handleAddLanguage}
          >
            {t("page.languages.add")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
