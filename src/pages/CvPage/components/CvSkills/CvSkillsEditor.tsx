import { useTranslation } from "react-i18next";
import RemoveIcon from "@assets/icon/RemoveIcon.svg?react";
import { Button, Modal } from "@components/shared";
import { useSkillCategoriesQuery, useSkillsSelectQuery } from "@root/pages/SkillsPage/api";
import { SkillsEditor } from "@root/pages/SkillsPage/components/SkillsEditor/SkillsEditor";
import { DeleteCvSkillInput } from "@services/graphql/__generated__/graphql";
import { useCvQuery } from "../../api";
import { AddCvSkillModal } from "./AddCvSkillModal/AddCvSkillModal";
import { CvSkillProgressBar } from "./CvSkillProgressBar/CvSkillProgressBar";
import { RemoveCvSkillModal } from "./RemoveCvSkillModal/RemoveCvSkillModal";

type CvSkillsEditorProps = {
  cvId: string;
};

export const CvSkillsEditor = ({ cvId }: CvSkillsEditorProps) => {
  const { t } = useTranslation();
  const { data: cvData } = useCvQuery(cvId);
  const { data: skillsData } = useSkillsSelectQuery();
  const { data: categoriesData } = useSkillCategoriesQuery();

  return (
    <SkillsEditor
      skills={cvData?.skills}
      categories={categoriesData}
      uncategorizedLabel={t("page.skills.uncategorized")}
      renderSkillBar={(skill, deleteContext) => (
        <CvSkillProgressBar
          cvId={cvId}
          name={skill.name}
          mastery={skill.mastery}
          categoryId={skill.categoryId}
          isDeleteMode={deleteContext.isDeleteMode}
          chosen={deleteContext.chosen}
          onClick={deleteContext.onClick}
        />
      )}
      renderToolbar={({
        isDeleteMode,
        deletedSkillNames,
        onCancelDeleteMode,
        onEnableDeleteMode,
        onChangeDeletedSkillNames,
      }) => {
        const deletedSkills: DeleteCvSkillInput = { cvId, name: deletedSkillNames };

        if (isDeleteMode) {
          return (
            <>
              <Button variant="outline" className="w-40" onClick={onCancelDeleteMode}>
                {t("page.skills.cancel")}
              </Button>
              <RemoveCvSkillModal
                cvId={cvId}
                deletedSkills={deletedSkills}
                onChangeDeletedSkills={(value) => onChangeDeletedSkillNames(value.name)}
                onChangeMode={(mode) => {
                  if (!mode) onCancelDeleteMode();
                }}
              />
            </>
          );
        }

        return (
          <Modal>
            <AddCvSkillModal cvId={cvId} skills={skillsData?.items} />
            <Button
              variant="ghost"
              className="w-40 uppercase text-red p-4 flex items-center justify-center gap-2"
              onClick={onEnableDeleteMode}
            >
              <RemoveIcon />
              {t("page.skills.removeSkills")}
            </Button>
          </Modal>
        );
      }}
    />
  );
};
