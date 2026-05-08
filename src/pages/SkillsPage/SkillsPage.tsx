import { useLocation } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import RemoveIcon from "@assets/icon/RemoveIcon.svg?react";
import { Breadcrumbs, Button, Modal } from "@components/shared";
import { useAuth } from "@root/hooks";
import { getBreadcrumbsLink } from "@root/lib";
import { DeleteProfileSkillInput } from "@services/graphql/__generated__/graphql";
import {
  getMasteryOptions,
  useSkillCategoriesQuery,
  useSkillsSelectQuery,
  useUserSkillsQuery,
} from "./api";
import { AddSkillModal, RemoveSkillModal, SkillProgressBar, SkillsTable } from "./components";
import { buildCategoryNameById, groupSkillsByCategory, MASTERY_ORDER } from "./const";

export const SkillsPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { userId, isAdmin } = useAuth();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [deletedSkills, setDeletedSkills] = useState<DeleteProfileSkillInput>({
    userId,
    name: [],
  });

  const masteryOptions = getMasteryOptions(MASTERY_ORDER);

  const { data: userSkillsData } = useUserSkillsQuery(userId, isAdmin);
  const { data: skillsData } = useSkillsSelectQuery();
  const { data: categoriesData } = useSkillCategoriesQuery();

  const groupedSkills = useMemo(() => {
    const categoryNameById = buildCategoryNameById(categoriesData);

    return groupSkillsByCategory(
      userSkillsData?.skills,
      categoryNameById,
      t("page.skills.uncategorized"),
    );
  }, [categoriesData, userSkillsData?.skills, t]);

  const resetDeletedSkills = () => {
    setIsDeleteMode(false);
    setDeletedSkills({ userId, name: [] });
  };

  const enableDeleteMode = () => {
    setDeletedSkills({ userId, name: [] });
    setIsDeleteMode(true);
  };

  const toggleDeletedSkill = (skillName: string) => {
    setDeletedSkills((prev) => {
      const isSelected = prev.name.includes(skillName);

      return {
        ...prev,
        name: isSelected
          ? prev.name.filter((name) => name !== skillName)
          : [...prev.name, skillName],
      };
    });
  };

  const hasGroupedSkills = groupedSkills.length > 0;

  return (
    <div className="flex flex-col px-6 w-full">
      <Breadcrumbs items={[getBreadcrumbsLink(location.pathname, t)]} className="pl-5 pb-4" />
      {isAdmin && <SkillsTable />}

      {!isAdmin && (
        <div className="mx-auto flex flex-col pt-8">
          {!hasGroupedSkills && <div>{t("page.skills.emptyState")}</div>}

          {hasGroupedSkills && (
            <div className="flex flex-col gap-6">
              {groupedSkills.map((group) => (
                <div key={group.categoryId ?? "uncategorized"} className="flex flex-col gap-2">
                  <h3 className="text-left text-base text-gray-3">{group.categoryName}</h3>
                  <div className="grid grid-cols-3">
                    {group.skills.map((skill) => (
                      <Modal key={skill.name}>
                        <SkillProgressBar
                          name={skill.name}
                          mastery={skill.mastery}
                          categoryId={skill.categoryId}
                          isDeleteMode={isDeleteMode}
                          chosen={isDeleteMode && deletedSkills.name.includes(skill.name)}
                          onClick={() => toggleDeletedSkill(skill.name)}
                        />
                      </Modal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="min-h-14 flex gap-8 justify-end pt-8">
            {isDeleteMode && (
              <>
                <Button variant="outline" className="w-40" onClick={resetDeletedSkills}>
                  {t("page.skills.cancel")}
                </Button>
                <RemoveSkillModal
                  deletedSkills={deletedSkills}
                  onChangeDeletedSkills={setDeletedSkills}
                  onChangeMode={setIsDeleteMode}
                />
              </>
            )}

            {!isDeleteMode && (
              <Modal>
                <AddSkillModal skills={skillsData?.items} masteryOptions={masteryOptions} />
                <Button
                  variant="ghost"
                  className="w-40 uppercase text-red p-4 flex items-center justify-center gap-2"
                  onClick={enableDeleteMode}
                >
                  <RemoveIcon />
                  {t("page.skills.removeSkills")}
                </Button>
              </Modal>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
