import { useAddProfileSkillMutation } from "@pages/SkillsPage/api";
import { AddSkillModal as AddSkillModalUi } from "@pages/SkillsPage/components/AddSkillModal/AddSkillModal";
import { AddSkillDraft } from "@pages/SkillsPage/components/AddSkillModal/types";
import { AddProfileSkillInput, Mastery } from "@services/graphql/__generated__/graphql";
import { AddSkillModalProps } from "./types";

export const ProfileAddSkillModal = ({
  userId,
  skills,
  addedSkillNames,
  masteryOptions,
}: AddSkillModalProps) => {
  const { mutateAsync } = useAddProfileSkillMutation(userId, {
    onSuccess: () => {},
  });

  const handleAddSkill = (draft: AddSkillDraft) => {
    const payload: AddProfileSkillInput = {
      userId,
      name: draft.name,
      mastery: (draft.mastery || "") as Mastery,
      categoryId: draft.categoryId ?? null,
    };

    return mutateAsync(payload);
  };

  return (
    <AddSkillModalUi
      skills={skills}
      addedSkillNames={addedSkillNames}
      masteryOptions={masteryOptions}
      disabled={!userId}
      onAdd={handleAddSkill}
    />
  );
};
