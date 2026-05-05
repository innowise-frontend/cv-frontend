import { useQuery } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RemoveIcon from "@assets/icon/RemoveIcon.svg?react";
import { Button, Breadcrumbs } from "@components/shared";
import { useAuth } from "@root/hooks";
import { getBreadcrumbsLink } from "@root/lib";
import { DeleteProfileLanguageInput } from "@services/graphql/__generated__/graphql";
import { getLanguages } from "@services/languages";
import { getUserProfile } from "@services/users";
import { AddLanguageModal, DeleteLanguageModal, LanguageProgressBar } from "./components";
import { PROFICIENCY_ORDER } from "./const";

export const LanguagesPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { userId } = useAuth();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [deletedLanguages, setDeletedLanguages] = useState<DeleteProfileLanguageInput>({
    userId,
    name: [],
  });

  const proficiencyOptions = PROFICIENCY_ORDER.map((proficiency) => ({
    label: proficiency,
    value: proficiency,
  }));

  const { data: userLanguagesData } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
  });

  const { data: languagesData } = useQuery({
    queryKey: ["languages"],
    queryFn: () => getLanguages({ page: 1, limit: 10 }),
  });

  const languageOptions =
    languagesData?.items?.map((item) => ({
      label: item.name,
      value: item.name,
    })) ?? [];

  const resetDeletedLanguages = () => {
    setIsDeleteMode(false);
    setDeletedLanguages({ userId, name: [] });
  };

  return (
    <div className="flex flex-col">
      <Breadcrumbs items={[getBreadcrumbsLink(location.pathname, t)]} className="pl-5" />
      <div className="mx-auto flex flex-col pt-8 px-6">
        <h2 className="text-left pb-4">{t("page.languages.currentLanguages")}</h2>
        <div className="grid grid-cols-3">
          {userLanguagesData?.languages.length === 0 ? (
            <div className="col-span-3">{t("page.languages.emptyState")}</div>
          ) : (
            userLanguagesData?.languages.map((language) => (
              <LanguageProgressBar
                key={language.name}
                name={language.name}
                proficiency={language.proficiency}
                isDeleteMode={isDeleteMode}
                chosen={isDeleteMode && deletedLanguages.name.includes(language.name)}
                onClick={() =>
                  setDeletedLanguages({
                    ...deletedLanguages,
                    name: deletedLanguages.name.includes(language.name)
                      ? deletedLanguages.name.filter(
                          (deletedLanguage) => deletedLanguage !== language.name,
                        )
                      : [...deletedLanguages.name, language.name],
                  })
                }
              />
            ))
          )}
        </div>
        <div className="min-h-14 flex gap-8 justify-end pt-4">
          {isDeleteMode ? (
            <>
              <Button variant="outline" className="w-40" onClick={resetDeletedLanguages}>
                {t("page.languages.cancel")}
              </Button>
              <DeleteLanguageModal
                deletedLanguages={deletedLanguages}
                onChangeDeletedLanguages={setDeletedLanguages}
                onChangeMode={setIsDeleteMode}
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
