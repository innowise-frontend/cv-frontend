import { useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RemoveIcon from "@assets/icon/RemoveIcon.svg?react";
import { Breadcrumbs, Button, Modal } from "@components/shared";
import { useAuth } from "@root/hooks";
import { getBreadcrumbsLink } from "@root/lib";
import { DeleteProfileLanguageInput, Proficiency } from "@services/graphql/__generated__/graphql";
import { getProficiencyOptions, useLanguagesQuery, useUserLanguagesQuery } from "./api";
import {
  AddLanguageModal,
  RemoveLanguageModal,
  LanguageProgressBar,
  LanguagesTable,
} from "./components";
import { PROFICIENCY_ORDER } from "./const";

export const LanguagesPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { userId, isAdmin } = useAuth();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [deletedLanguages, setDeletedLanguages] = useState<DeleteProfileLanguageInput>({
    userId,
    name: [],
  });

  const proficiencyOptions = getProficiencyOptions(PROFICIENCY_ORDER);

  const { data: userLanguagesData } = useUserLanguagesQuery(userId, { enabled: !isAdmin });

  const { data: languagesData } = useLanguagesQuery();

  const languageOptions =
    languagesData?.items?.map((item) => ({
      label: item.name,
      value: item.name,
    })) ?? [];

  const resetDeletedLanguages = () => {
    setIsDeleteMode(false);
    setDeletedLanguages({ userId, name: [] });
  };

  const handleClick = (language: { name: string; proficiency: Proficiency }) => {
    setDeletedLanguages({
      ...deletedLanguages,
      name: deletedLanguages.name.includes(language.name)
        ? deletedLanguages.name.filter((deletedLanguage) => deletedLanguage !== language.name)
        : [...deletedLanguages.name, language.name],
    });
  };

  return (
    <div className="flex flex-col">
      <Breadcrumbs items={[getBreadcrumbsLink(location.pathname, t)]} className="pl-5" />
      {isAdmin ? (
        <LanguagesTable />
      ) : (
        <div className="mx-auto flex flex-col pt-8 px-6">
          <h2 className="text-left pb-4">{t("page.languages.currentLanguages")}</h2>
          <div className="grid grid-cols-3">
            {userLanguagesData?.languages.length === 0 ? (
              <div className="col-span-3">{t("page.languages.emptyState")}</div>
            ) : (
              userLanguagesData?.languages.map((language) => (
                <Modal key={language.name}>
                  <LanguageProgressBar
                    name={language.name}
                    proficiency={language.proficiency}
                    isDeleteMode={isDeleteMode}
                    chosen={isDeleteMode && deletedLanguages.name.includes(language.name)}
                    onClick={() => handleClick(language)}
                  />
                </Modal>
              ))
            )}
          </div>
          <div className="min-h-14 flex gap-8 justify-end pt-4">
            {isDeleteMode ? (
              <>
                <Button variant="outline" className="w-40" onClick={resetDeletedLanguages}>
                  {t("page.languages.cancel")}
                </Button>
                <RemoveLanguageModal
                  deletedLanguages={deletedLanguages}
                  onChangeDeletedLanguages={setDeletedLanguages}
                  onChangeMode={setIsDeleteMode}
                />
              </>
            ) : (
              <Modal>
                <AddLanguageModal
                  languageOptions={languageOptions}
                  proficiencyOptions={proficiencyOptions}
                />
                <Button
                  variant="ghost"
                  className="w-40 uppercase text-red p-4 flex items-center justify-center gap-2"
                  onClick={() => {
                    setDeletedLanguages({ userId, name: [] });
                    setIsDeleteMode(true);
                  }}
                >
                  <RemoveIcon />
                  {t("page.languages.deleteLanguage")}
                </Button>
              </Modal>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
