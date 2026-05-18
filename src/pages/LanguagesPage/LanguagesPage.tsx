import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@components/shared";
import { useAuth } from "@root/hooks";
import { getBreadcrumbsLink } from "@root/lib";
import { LanguagesEditor, LanguagesTable } from "./components";

export const LanguagesPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { userId, isAdmin } = useAuth();

  return (
    <div className="flex h-full min-h-0 flex-col px-6">
      <Breadcrumbs items={[getBreadcrumbsLink(location.pathname, t)]} className="pl-5 pb-4" />
      {isAdmin && (
        <div className="flex min-h-0 flex-1 flex-col">
          <LanguagesTable />
        </div>
      )}
      {!isAdmin && (
        <div className="mx-auto flex flex-col w-[852px] pt-8">
          <LanguagesEditor userId={userId} />
        </div>
      )}
    </div>
  );
};
