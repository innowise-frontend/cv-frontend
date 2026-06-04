import { useAddCvSkillMutation } from "@pages/CvPage/api";
import { getMasteryOptions } from "@root/pages/SkillsPage/api";
import { AddSkillModal } from "@root/pages/SkillsPage/components/AddSkillModal/AddSkillModal";
import { MASTERY_ORDER } from "@root/pages/SkillsPage/const";
import { AddCvSkillInput, Mastery } from "@services/graphql/__generated__/graphql";
import { AddCvSkillModalProps } from "./types";

export const AddCvSkillModal = ({ cvId, skills, addedSkillNames }: AddCvSkillModalProps) => {
  const masteryOptions = getMasteryOptions(MASTERY_ORDER);

  const { mutateAsync } = useAddCvSkillMutation(cvId, {
    onSuccess: () => {},
  });

  return (
    <AddSkillModal
      skills={skills}
      addedSkillNames={addedSkillNames}
      masteryOptions={masteryOptions}
      disabled={!cvId}
      onAdd={(draft) => {
        const payload: AddCvSkillInput = {
          cvId,
          name: draft.name,
          mastery: (draft.mastery || "") as Mastery,
          categoryId: draft.categoryId ?? null,
        };

        return mutateAsync(payload);
      }}
    />
  );
};
