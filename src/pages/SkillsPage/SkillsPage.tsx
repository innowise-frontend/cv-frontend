import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@components/shared";
import { useAuth } from "@root/hooks";
import { getBreadcrumbsLink } from "@root/lib";
import { SkillsEditor, SkillsTable } from "./components";

export const SkillsPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { userId, isAdmin } = useAuth();

  return (
    <div className="flex flex-col px-6 w-full">
      <Breadcrumbs items={[getBreadcrumbsLink(location.pathname, t)]} className="pl-5 pb-4" />
      {isAdmin && <SkillsTable />}
      {!isAdmin && (
        <div className="mx-auto flex flex-col w-[852px] pt-8">
          <SkillsEditor userId={userId} />
        </div>
      )}
    </div>
  );
};
