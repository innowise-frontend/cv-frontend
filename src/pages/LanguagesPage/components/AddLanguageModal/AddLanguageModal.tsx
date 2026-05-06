import { useState } from "react";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Modal, Select } from "@components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { useAuth } from "@root/hooks";
import { AddProfileLanguageInput, Proficiency } from "@services/graphql/__generated__/graphql";
import { AddLanguageModalProps } from "./types";
import { useAddProfileLanguageMutation } from "../../api";

export const AddLanguageModal = ({
  languageOptions,
  proficiencyOptions,
}: AddLanguageModalProps) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState<AddProfileLanguageInput>({
    userId: userId,
    name: "",
    proficiency: "" as Proficiency,
  });

  const { closeModal } = useModalContext();

  const resetSelectedLanguage = () => {
    setSelectedLanguage({ userId, name: "", proficiency: "" as Proficiency });
  };

  const { mutateAsync } = useAddProfileLanguageMutation(userId, {
    onSuccess: () => {
      closeModal();
    },
  });

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
        <Modal.Header onCancel={resetSelectedLanguage}>
          {t("page.languages.addLanguage")}
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <Select
            list={languageOptions}
            label={t("page.languages.language")}
            placeholder={t("page.languages.language")}
            value={selectedLanguage.name}
            onValueChange={(value) => setSelectedLanguage({ ...selectedLanguage, name: value })}
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
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
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-4">
          <Modal.Close variant="outline" className="w-40" onClick={resetSelectedLanguage}>
            {t("page.languages.cancel")}
          </Modal.Close>
          <Modal.Close
            variant="filled"
            className="w-40"
            disabled={!selectedLanguage.name || !selectedLanguage.proficiency}
            onClick={async () => {
              mutateAsync(selectedLanguage);
            }}
          >
            {t("page.languages.add")}
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
