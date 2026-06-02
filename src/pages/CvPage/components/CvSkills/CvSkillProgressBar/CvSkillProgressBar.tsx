import { getMasteryOptions } from "@root/pages/SkillsPage/api";
import { SkillProgressBar } from "@root/pages/SkillsPage/components/SkillProgressBar/SkillProgressBar";
import { MASTERY_ORDER } from "@root/pages/SkillsPage/const";
import { UpdateCvSkillInput } from "@services/graphql/__generated__/graphql";
import { CvSkillProgressBarProps } from "./types";
import { useUpdateCvSkillMutation } from "../../../api";

export const CvSkillProgressBar = ({
  cvId,
  name,
  mastery,
  categoryId,
  chosen = false,
  isDeleteMode = false,
  onClick,
}: CvSkillProgressBarProps) => {
  const masteryOptions = getMasteryOptions(MASTERY_ORDER);

  const { mutateAsync } = useUpdateCvSkillMutation(cvId, {
    onSuccess: () => {},
  });

  return (
    <SkillProgressBar
      name={name}
      mastery={mastery}
      masteryOptions={masteryOptions}
      disabled={!cvId}
      chosen={chosen}
      isDeleteMode={isDeleteMode}
      onClick={onClick}
      onUpdate={(draft) => {
        const payload: UpdateCvSkillInput = {
          cvId,
          name,
          mastery: draft.mastery,
          categoryId: categoryId ?? null,
        };

        return mutateAsync(payload);
      }}
    />
  );
};
