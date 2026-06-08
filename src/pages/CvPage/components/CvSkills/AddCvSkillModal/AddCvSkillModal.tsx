import { useAddCvSkillMutation } from "@pages/CvPage/api";
import { AddSkillModal } from "@root/pages/SkillsPage/components/AddSkillModal/AddSkillModal";
import { AddCvSkillInput, Mastery } from "@services/graphql/__generated__/graphql";
import { AddCvSkillModalProps } from "./types";

export const AddCvSkillModal = ({ cvId, skills, addedSkillNames }: AddCvSkillModalProps) => {
  const { mutateAsync } = useAddCvSkillMutation(cvId, {
    onSuccess: () => {},
  });

  return (
    <AddSkillModal
      skills={skills}
      addedSkillNames={addedSkillNames}
      masteryFromSkill
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
