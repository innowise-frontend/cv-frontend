import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@components/shared";
import { ROUTES } from "@root/constants";
import { getBreadcrumbsLink } from "@root/lib";
import { PositionsTable } from "./components";

export const PositionsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full min-h-0 flex-col px-6">
      <Breadcrumbs items={[getBreadcrumbsLink(ROUTES.POSITIONS, t)]} className="pl-5 pb-4" />
      <div className="flex min-h-0 flex-1 flex-col">
        <PositionsTable />
      </div>
    </div>
  );
};
