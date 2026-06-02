import { useTranslation } from "react-i18next";
import { useSkillCategoriesQuery, useUserSkillsQuery } from "../../../../../pages/SkillsPage/api";
import { GroupedSkillsView } from "../../../../../pages/SkillsPage/components/GroupedSkillsView/GroupedSkillsView";

type ProfileSkillsViewProps = {
  userId: string;
};

export const ProfileSkillsView = ({ userId }: ProfileSkillsViewProps) => {
  const { t } = useTranslation();
  const { data: profileData } = useUserSkillsQuery(userId);
  const { data: categoriesData } = useSkillCategoriesQuery();

  return (
    <GroupedSkillsView
      skills={profileData?.skills}
      categories={categoriesData}
      uncategorizedLabel={t("page.skills.uncategorized")}
      emptyMessage={t("page.skills.emptyState")}
    />
  );
};
