import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@root/components/shared";
import { getBreadcrumbsLink } from "@root/lib";
import { CvsTable } from "./components/CvsTable/CvsTable";

export const UserCvsPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden px-6">
      <Breadcrumbs items={[getBreadcrumbsLink(location.pathname, t)]} className="pl-5 pb-4" />
      <div className="flex min-h-0 flex-1 flex-col">
        <CvsTable />
      </div>
    </div>
  );
};
