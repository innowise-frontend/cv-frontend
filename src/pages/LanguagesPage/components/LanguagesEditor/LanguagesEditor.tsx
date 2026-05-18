import { useState } from "react";
import { useTranslation } from "react-i18next";
import RemoveIcon from "@assets/icon/RemoveIcon.svg?react";
import { Button, Modal } from "@components/shared";
import { EmptyContent } from "@root/components/shared/EmptyContent/EmptyContent";
import { DeleteProfileLanguageInput } from "@services/graphql/__generated__/graphql";
import { LanguagesEditorProps } from "./types";
import { getProficiencyOptions, useLanguagesQuery, useUserLanguagesQuery } from "../../api";
import { PROFICIENCY_ORDER } from "../../const";
import { AddLanguageModal } from "../AddLanguageModal/AddLanguageModal";
import { LanguageProgressBar } from "../LanguageProgressBar/LanguageProgressBar";
import { RemoveLanguageModal } from "../RemoveLanguageModal/RemoveLanguageModal";

export const LanguagesEditor = ({ userId }: LanguagesEditorProps) => {
  const { t } = useTranslation();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [deletedLanguages, setDeletedLanguages] = useState<DeleteProfileLanguageInput>({
    userId,
    name: [],
  });

  const { data: profileData } = useUserLanguagesQuery(userId);
  const { data: languagesData } = useLanguagesQuery();

  const proficiencyOptions = getProficiencyOptions(PROFICIENCY_ORDER);
  const languageOptions =
    languagesData?.items?.map((item) => ({ label: item.name, value: item.name })) ?? [];

  const languages = profileData?.languages ?? [];
  const hasLanguages = languages.length > 0;

  const resetDeletedLanguages = () => {
    setIsDeleteMode(false);
    setDeletedLanguages({ userId, name: [] });
  };

  const enableDeleteMode = () => {
    setDeletedLanguages({ userId, name: [] });
    setIsDeleteMode(true);
  };

  const toggleDeletedLanguage = (languageName: string) => {
    setDeletedLanguages((prev) => {
      const isSelected = prev.name.includes(languageName);

      return {
        ...prev,
        name: isSelected
          ? prev.name.filter((name) => name !== languageName)
          : [...prev.name, languageName],
      };
    });
  };

  return (
    <div className="mx-auto flex flex-col px-6 w-full">
      {!hasLanguages && <EmptyContent message={t("page.languages.emptyState")} />}
      {hasLanguages && <h2 className="text-left pb-4">{t("page.languages.currentLanguages")}</h2>}
      <div className="grid grid-cols-3">
        {hasLanguages &&
          languages.map((language) => (
            <Modal key={language.name}>
              <LanguageProgressBar
                userId={userId}
                name={language.name}
                proficiency={language.proficiency}
                isDeleteMode={isDeleteMode}
                chosen={isDeleteMode && deletedLanguages.name.includes(language.name)}
                onClick={() => toggleDeletedLanguage(language.name)}
              />
            </Modal>
          ))}
      </div>

      <div className="min-h-14 flex gap-8 justify-end pt-8">
        {isDeleteMode && (
          <>
            <Button variant="outline" className="w-40" onClick={resetDeletedLanguages}>
              {t("page.languages.cancel")}
            </Button>
            <RemoveLanguageModal
              userId={userId}
              deletedLanguages={deletedLanguages}
              onChangeDeletedLanguages={setDeletedLanguages}
              onChangeMode={setIsDeleteMode}
            />
          </>
        )}

        {!isDeleteMode && (
          <Modal>
            <AddLanguageModal
              userId={userId}
              languageOptions={languageOptions}
              proficiencyOptions={proficiencyOptions}
            />
            <Button
              variant="ghost"
              className="w-40 uppercase text-red p-4 flex items-center justify-center gap-2"
              onClick={enableDeleteMode}
            >
              <RemoveIcon />
              {t("page.languages.deleteLanguage")}
            </Button>
          </Modal>
        )}
      </div>
    </div>
  );
};
