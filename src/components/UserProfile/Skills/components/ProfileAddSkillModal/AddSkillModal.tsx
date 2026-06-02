import { useAddProfileSkillMutation } from "@pages/SkillsPage/api";
import { AddSkillModal as AddSkillModalUi } from "@pages/SkillsPage/components/AddSkillModal/AddSkillModal";
import { AddProfileSkillInput, Mastery } from "@services/graphql/__generated__/graphql";
import { AddSkillModalProps } from "./types";

export const ProfileAddSkillModal = ({ userId, skills, masteryOptions }: AddSkillModalProps) => {
  const { mutateAsync } = useAddProfileSkillMutation(userId, {
    onSuccess: () => {},
  });

  return (
    <AddSkillModalUi
      skills={skills}
      masteryOptions={masteryOptions}
      disabled={!userId}
      onAdd={(draft) => {
        const payload: AddProfileSkillInput = {
          userId,
          name: draft.name,
          mastery: (draft.mastery || "") as Mastery,
          categoryId: draft.categoryId ?? null,
        };

        return mutateAsync(payload);
      }}
    />
  );
};
