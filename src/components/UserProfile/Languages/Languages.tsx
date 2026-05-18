import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "@components/shared";
import { EmptyContent } from "@root/components/shared/EmptyContent/EmptyContent";
import { useAuth } from "@root/hooks";
import { useUserLanguagesQuery } from "@root/pages/LanguagesPage/api";
import { LanguagesEditor } from "@root/pages/LanguagesPage/components";

export const Languages = () => {
  const { t } = useTranslation();
  const { userId: profileUserId } = useParams({ from: "/_app/users/$userId" });
  const { userId: viewerId, isAdmin } = useAuth();
  const canEdit = isAdmin || (!!viewerId && viewerId === profileUserId);

  const { data: profileData } = useUserLanguagesQuery(profileUserId, { enabled: !canEdit });
  const languages = profileData?.languages ?? [];

  return (
    <div className="mx-auto flex flex-col w-[852px] pt-8">
      {canEdit ? (
        <LanguagesEditor userId={profileUserId} />
      ) : (
        <>
          {languages.length > 0 && (
            <h2 className="text-left pb-4">{t("page.languages.currentLanguages")}</h2>
          )}
          {!languages.length && <EmptyContent message={t("page.languages.emptyState")} />}
          <div className="grid grid-cols-3">
            {languages.length > 0 &&
              languages.map((language) => (
                <ProgressBar
                  key={language.name}
                  className="px-2"
                  label={language.name}
                  proficiency={language.proficiency}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};
