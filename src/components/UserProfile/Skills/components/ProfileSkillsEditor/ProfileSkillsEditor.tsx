import { useTranslation } from "react-i18next";
import RemoveIcon from "@assets/icon/RemoveIcon.svg?react";
import { Button, Modal } from "@components/shared";
import { SkillsEditor } from "@pages/SkillsPage";
import {
  getMasteryOptions,
  useSkillCategoriesQuery,
  useSkillsSelectQuery,
  useUserSkillsQuery,
} from "@pages/SkillsPage/api";
import { MASTERY_ORDER } from "@pages/SkillsPage/const";
import {
  ProfileAddSkillModal,
  ProfileRemoveSkillModal,
  ProfileSkillProgressBar,
} from "@root/components/UserProfile/Skills";
import { DeleteProfileSkillInput } from "@services/graphql/__generated__/graphql";
import { ProfileSkillsEditorProps } from "./types";

export const ProfileSkillsEditor = ({ userId }: ProfileSkillsEditorProps) => {
  const { t } = useTranslation();
  const { data: profileData, isLoading } = useUserSkillsQuery(userId);
  const { data: skillsData } = useSkillsSelectQuery();
  const { data: categoriesData } = useSkillCategoriesQuery();
  const masteryOptions = getMasteryOptions(MASTERY_ORDER);

  const getDeletedSkillNames = (value: DeleteProfileSkillInput) => value.name;

  const cancelDeleteModeIfDisabled = (mode: boolean, onCancelDeleteMode: () => void) => {
    if (!mode) onCancelDeleteMode();
  };

  return (
    <SkillsEditor
      skills={profileData?.skills}
      categories={categoriesData}
      uncategorizedLabel={t("page.skills.uncategorized")}
      isLoading={isLoading}
      renderSkillBar={(skill, deleteContext) => (
        <ProfileSkillProgressBar
          userId={userId}
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
        if (isDeleteMode) {
          const deletedSkills: DeleteProfileSkillInput = { userId, name: deletedSkillNames };

          return (
            <>
              <Button variant="outline" className="w-40" onClick={onCancelDeleteMode}>
                {t("page.skills.cancel")}
              </Button>
              <ProfileRemoveSkillModal
                userId={userId}
                deletedSkills={deletedSkills}
                onChangeDeletedSkills={(value) =>
                  onChangeDeletedSkillNames(getDeletedSkillNames(value))
                }
                onChangeMode={(mode) => cancelDeleteModeIfDisabled(mode, onCancelDeleteMode)}
              />
            </>
          );
        }

        return (
          <Modal>
            <ProfileAddSkillModal
              userId={userId}
              skills={skillsData?.items}
              addedSkillNames={profileData?.skills?.map((skill) => skill.name) ?? []}
              masteryOptions={masteryOptions}
            />
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
