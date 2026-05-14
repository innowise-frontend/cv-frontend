import { useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { Breadcrumbs } from "@root/components/shared/Breadcrumbs/Breadcrumbs";
import { PageTabs } from "@root/components/shared/Tabs/Tabs";
import { useUserProfile } from "@root/components/UserProfile/Profile/api";
import { PROFILE_TABS } from "./constants";
import type React from "react";

export const UserProfilePage = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { userId } = useParams({ from: "/_app/users/$userId" });
  const { data } = useUserProfile(userId);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeTab = pathname.split("/").at(-1) ?? "profile";
  const fullName = data?.user.profile.full_name ?? "";

  return (
    <div className="px-6 w-full">
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
        className="px-5 py-4"
      />

      <PageTabs
        tabs={PROFILE_TABS}
        value={activeTab}
        onValueChange={(next) => {
          navigate({
            to: "/users/$userId/" + next,
            params: { userId },
          });
        }}
      >
        {children}
      </PageTabs>
    </div>
  );
};
