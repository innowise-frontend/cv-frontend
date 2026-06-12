import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Spinner } from "@components/shared";
import { EmptyContent } from "@components/shared/EmptyContent/EmptyContent";
import { SkillsEditorProps } from "./types";
import { buildCategoryNameById, groupSkillsByCategory } from "../../const";

export const SkillsEditor = ({
  skills,
  categories,
  uncategorizedLabel,
  isLoading = false,
  renderSkillBar,
  renderToolbar,
}: SkillsEditorProps) => {
  const { t } = useTranslation();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [deletedSkillNames, setDeletedSkillNames] = useState<string[]>([]);

  const groupedSkills = useMemo(() => {
    const categoryNameById = buildCategoryNameById(categories);

    return groupSkillsByCategory(skills, categoryNameById, uncategorizedLabel);
  }, [categories, skills, uncategorizedLabel]);

  const onCancelDeleteMode = () => {
    setIsDeleteMode(false);
    setDeletedSkillNames([]);
  };

  const onEnableDeleteMode = () => {
    setDeletedSkillNames([]);
    setIsDeleteMode(true);
  };

  const onToggleDeletedSkill = (skillName: string) => {
    setDeletedSkillNames((prev) =>
      prev.includes(skillName) ? prev.filter((name) => name !== skillName) : [...prev, skillName],
    );
  };

  const hasGroupedSkills = groupedSkills.length > 0;

  return (
    <div className="mx-auto flex flex-col px-6 w-full">
      {isLoading ? (
        <Spinner />
      ) : hasGroupedSkills ? (
        <div className="flex flex-col gap-6">
          {groupedSkills.map((group) => (
            <div key={group.categoryId ?? "uncategorized"} className="flex flex-col gap-2">
              <h3 className="text-left text-base text-gray-3 dark:text-gray-6">
                {group.categoryName}
              </h3>
              <div className="grid grid-cols-3 mb-8">
                {group.skills.map((skill) => (
                  <Modal key={skill.name}>
                    {renderSkillBar(skill, {
                      isDeleteMode,
                      chosen: isDeleteMode && deletedSkillNames.includes(skill.name),
                      onClick: () => onToggleDeletedSkill(skill.name),
                    })}
                  </Modal>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyContent message={t("page.table.noDataResults")} className="mt-18 mb-8" />
      )}

      <div className="min-h-14 flex gap-8 justify-end pt-4">
        {renderToolbar({
          isDeleteMode,
          deletedSkillNames,
          onCancelDeleteMode,
          onEnableDeleteMode,
          onToggleDeletedSkill,
          onChangeDeletedSkillNames: setDeletedSkillNames,
        })}
      </div>
    </div>
  );
};
