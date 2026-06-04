import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@components/shared";
import { ROUTES } from "@root/constants";
import { getBreadcrumbsLink } from "@root/lib";
import { ProjectsTable } from "./components";

export const ProjectsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full min-h-0 flex-col px-6">
      <Breadcrumbs items={[getBreadcrumbsLink(ROUTES.PROJECTS, t)]} className="pl-5 pb-4" />
      <ProjectsTable />
    </div>
  );
};
