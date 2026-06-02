import { getMasteryOptions, useUpdateProfileSkillMutation } from "@pages/SkillsPage/api";
import { SkillProgressBar as SkillProgressBarUi } from "@pages/SkillsPage/components/SkillProgressBar/SkillProgressBar";
import type { UpdateSkillDraft } from "@pages/SkillsPage/components/SkillProgressBar/types";
import { MASTERY_ORDER } from "@pages/SkillsPage/const";
import { SkillProgressBarProps } from "./types";

export const ProfileSkillProgressBar = ({
  userId,
  name,
  mastery,
  categoryId,
  chosen = false,
  isDeleteMode = false,
  onClick,
}: SkillProgressBarProps) => {
  const masteryOptions = getMasteryOptions(MASTERY_ORDER);

  const { mutateAsync } = useUpdateProfileSkillMutation(userId, {
    onSuccess: () => {},
  });

  const handleUpdate = (draft: UpdateSkillDraft) =>
    mutateAsync({
      userId,
      name,
      mastery: draft.mastery,
      categoryId: categoryId ?? null,
    });

  return (
    <SkillProgressBarUi
      name={name}
      mastery={mastery}
      masteryOptions={masteryOptions}
      disabled={!userId}
      chosen={chosen}
      isDeleteMode={isDeleteMode}
      onClick={onClick}
      onUpdate={handleUpdate}
    />
  );
};
