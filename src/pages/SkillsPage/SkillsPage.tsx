import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@components/shared";
import { ProfileSkillsEditor } from "@components/UserProfile/Skills";
import { SkillsTable } from "@pages/SkillsPage";
import { ROUTES } from "@root/constants";
import { useAuth } from "@root/hooks";
import { getBreadcrumbsLink } from "@root/lib";

export const SkillsPage = () => {
  const { t } = useTranslation();
  const { userId, isAdmin } = useAuth();

  return (
    <div className="flex flex-col px-6 w-full">
      <Breadcrumbs items={[getBreadcrumbsLink(ROUTES.SKILLS, t)]} className="pl-5 pb-4" />
      {isAdmin && <SkillsTable />}
      {!isAdmin && (
        <div className="mx-auto flex flex-col w-[852px] pt-8">
          <ProfileSkillsEditor userId={userId} />
        </div>
      )}
    </div>
  );
};
