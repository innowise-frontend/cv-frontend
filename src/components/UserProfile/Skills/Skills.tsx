import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "@components/shared";
import { EmptyContent } from "@root/components/shared/EmptyContent/EmptyContent";
import { useAuth } from "@root/hooks";
import { useSkillCategoriesQuery, useUserSkillsQuery } from "@root/pages/SkillsPage/api";
import { SkillsEditor } from "@root/pages/SkillsPage/components";
import { buildCategoryNameById, groupSkillsByCategory } from "@root/pages/SkillsPage/const";

export const Skills = () => {
  const { t } = useTranslation();
  const { userId: profileUserId } = useParams({ from: "/_app/users/$userId" });
  const { userId: viewerId, isAdmin } = useAuth();
  const canEdit = isAdmin || (!!viewerId && viewerId === profileUserId);

  const { data: profileData } = useUserSkillsQuery(profileUserId, { enabled: !canEdit });
  const { data: categoriesData } = useSkillCategoriesQuery();

  const groupedSkills = useMemo(() => {
    const categoryNameById = buildCategoryNameById(categoriesData);

    return groupSkillsByCategory(
      profileData?.skills,
      categoryNameById,
      t("page.skills.uncategorized"),
    );
  }, [categoriesData, profileData?.skills, t]);

  const hasGroupedSkills = groupedSkills.length > 0;

  return (
    <div className="mx-auto flex flex-col w-[852px] pt-8">
      {canEdit ? (
        <SkillsEditor userId={profileUserId} />
      ) : (
        <>
          {!hasGroupedSkills && <EmptyContent message={t("page.skills.emptyState")} />}

          {hasGroupedSkills && (
            <div className="flex flex-col gap-6">
              {groupedSkills.map((group) => (
                <div key={group.categoryId ?? "uncategorized"} className="flex flex-col gap-2">
                  <h3 className="text-left text-base text-gray-3">{group.categoryName}</h3>
                  <div className="grid grid-cols-3">
                    {group.skills.map((skill) => (
                      <ProgressBar
                        key={skill.name}
                        className="px-2"
                        label={skill.name}
                        mastery={skill.mastery}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
