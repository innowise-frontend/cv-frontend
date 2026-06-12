import { useState } from "react";
import { useTranslation } from "react-i18next";
import { modalFormBodyClassName } from "@components/shared/formFieldStyles";
import { Button, Modal, ProgressBar, Select } from "@root/components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { Proficiency, UpdateProfileLanguageInput } from "@services/graphql/__generated__/graphql";
import { LanguageProps } from "./types";
import { useUpdateProfileLanguageMutation } from "../../api";
import { PROFICIENCY_ORDER } from "../../const";

export const LanguageProgressBar = ({
  userId,
  name,
  proficiency,
  chosen = false,
  isDeleteMode = false,
  onClick,
}: LanguageProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  const [updateLanguage, setUpdateLanguage] = useState<UpdateProfileLanguageInput>({
    userId,
    name,
    proficiency,
  });

  const proficiencyOptions = PROFICIENCY_ORDER.map((proficiency) => ({
    label: proficiency,
    value: proficiency,
  }));

  const { mutate } = useUpdateProfileLanguageMutation(userId, {
    onSuccess: () => {
      closeModal();
    },
  });

  const resetUpdateLanguage = () => {
    setUpdateLanguage({ userId, name, proficiency });
  };

  const handleUpdateLanguage = () => {
    mutate({ ...updateLanguage, userId });
  };

  if (isDeleteMode) {
    return (
      <Button variant="ghost" className="capitalize hover:bg-transparent!" onClick={onClick}>
        <ProgressBar
          interactive
          className="px-2"
          label={name || ""}
          proficiency={proficiency as Proficiency}
          chosen={chosen}
        />
      </Button>
    );
  }

  return (
    <>
      <Modal.Trigger className="capitalize hover:bg-transparent!" variant="ghost">
        <ProgressBar interactive className="px-2" label={name || ""} proficiency={proficiency} />
      </Modal.Trigger>
      <Modal.Content onCancel={resetUpdateLanguage}>
        <Modal.Header>{t("page.languages.updateLanguage")}</Modal.Header>
        <Modal.Body className={modalFormBodyClassName}>
          <Select
            list={[{ label: name, value: name }]}
            label={t("page.languages.language")}
            disabled={true}
            value={name}
            onValueChange={(value) => setUpdateLanguage({ ...updateLanguage, name: value })}
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
          <Select
            list={proficiencyOptions}
            label={t("page.languages.proficiency")}
            placeholder={t("page.languages.proficiency")}
            value={updateLanguage.proficiency}
            disablePortal
            onValueChange={(value) =>
              setUpdateLanguage({ ...updateLanguage, proficiency: value as Proficiency })
            }
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.languages.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            disabled={updateLanguage.proficiency === proficiency || !userId}
            onClick={handleUpdateLanguage}
          >
            {t("page.languages.save")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
