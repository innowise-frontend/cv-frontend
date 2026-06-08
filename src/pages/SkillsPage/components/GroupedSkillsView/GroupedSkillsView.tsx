import { useMemo } from "react";
import { ProgressBar } from "@components/shared";
import { EmptyContent } from "@components/shared/EmptyContent/EmptyContent";
import { GroupedSkillsViewProps } from "./types";
import { buildCategoryNameById, groupSkillsByCategory } from "../../const";

export const GroupedSkillsView = ({
  skills,
  categories,
  uncategorizedLabel,
  emptyMessage,
}: GroupedSkillsViewProps) => {
  const groupedSkills = useMemo(() => {
    const categoryNameById = buildCategoryNameById(categories);

    return groupSkillsByCategory(skills, categoryNameById, uncategorizedLabel);
  }, [categories, skills, uncategorizedLabel]);

  if (!groupedSkills.length) {
    return <EmptyContent message={emptyMessage} className="mt-18 mb-8" />;
  }

  return (
    <div className="flex flex-col gap-6">
      {groupedSkills.map((group) => (
        <div key={group.categoryId ?? "uncategorized"} className="flex flex-col gap-2">
          <h3 className="text-left text-base text-gray-3">{group.categoryName}</h3>
          <div className="grid grid-cols-3 mb-8">
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
  );
};
