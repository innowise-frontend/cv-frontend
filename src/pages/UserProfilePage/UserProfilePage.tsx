import { useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Spinner } from "@components/shared";
import { Breadcrumbs } from "@components/shared/Breadcrumbs/Breadcrumbs";
import { PageTabs } from "@components/shared/Tabs/Tabs";
import { useUserProfile } from "@components/UserProfile/Profile/api";
import { ErrorPage } from "@root/pages/ErrorPage";
import { PROFILE_TABS } from "./constants";
import type React from "react";

export const UserProfilePage = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userId } = useParams({ from: "/_app/users/$userId" });
  const { data, isLoading, isError } = useUserProfile(userId);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeTab = pathname.split("/").at(-1) ?? "profile";
  const fullName = data?.user.profile.full_name ?? "";

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden px-6">
      <Breadcrumbs
        items={[
          { label: "Employees", href: `/` },
          {
            label: fullName,
            href: `/users/${userId}/profile`,
            isProfile: true,
          },
          { label: activeTab, href: `/users/${userId}/${activeTab}` },
        ]}
        className="shrink-0 px-5 py-4"
      />

      <PageTabs
        className="min-h-0 flex-1 overflow-hidden"
        tabs={PROFILE_TABS}
        value={activeTab}
        onValueChange={(next) => {
          navigate({
            to: "/users/$userId/" + next,
            params: { userId },
          });
        }}
      >
        {isError ? <ErrorPage embedded error={t("page.profile.userNotFound")} /> : children}
      </PageTabs>
    </div>
  );
};
