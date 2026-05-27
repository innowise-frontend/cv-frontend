import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@components/shared";
import { ROUTES } from "@root/constants";
import { useAuth } from "@root/hooks";
import { getBreadcrumbsLink } from "@root/lib";
import { DepartmentsTable } from "./components/DepartmentsTable/DepartmentsTable";

export const DepartmentsPage = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();

  return (
    <div className="flex flex-col px-6 w-full">
      <Breadcrumbs items={[getBreadcrumbsLink(ROUTES.DEPARTMENTS, t)]} className="pl-5 pb-4" />
      {isAdmin && (
        <div className="flex h-full min-h-0 flex-1 flex-col">
          <DepartmentsTable />
        </div>
      )}
    </div>
  );
};
