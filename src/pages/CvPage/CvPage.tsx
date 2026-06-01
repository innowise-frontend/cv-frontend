import { useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Breadcrumbs, Spinner } from "@components/shared";
import { PageTabs } from "@components/shared/Tabs/Tabs";
import { ROUTES } from "@root/constants";
import { getBreadcrumbsLink, getTabs } from "@root/lib";
import { ErrorPage } from "@root/pages/ErrorPage";
import { useCvQuery } from "./api";
import { CV_TAB_CONFIG } from "./constants";
import { CvPageProps } from "./types";

export const CvPage = ({ children }: CvPageProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cvId } = useParams({ from: "/_app/cvs/$cvId" });
  const { data: cv, isLoading, isError } = useCvQuery(cvId);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeTab = pathname.split("/").at(-1) ?? "details";
  const tabs = useMemo(() => getTabs(CV_TAB_CONFIG, t), [t]);
  const activeTabLabel = tabs.find((tab) => tab.value === activeTab)?.label ?? activeTab;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !cv) {
    return <ErrorPage error={t("page.error.defaultErrorMessage")} />;
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden px-6">
      <Breadcrumbs
        items={[
          getBreadcrumbsLink(ROUTES.CVS, t),
          { label: cv.name ?? cvId, href: `/cvs/${cvId}/details` },
          { label: activeTabLabel, href: `/cvs/${cvId}/${activeTab}` },
        ]}
        className="shrink-0 px-5 py-4"
      />

      <PageTabs
        className="min-h-0 flex-1 overflow-hidden"
        tabs={tabs}
        value={activeTab}
        onValueChange={(next) => {
          navigate({
            to: "/cvs/$cvId/" + next,
            params: { cvId },
          });
        }}
      >
        {children}
      </PageTabs>
    </div>
  );
};
