import { useDeleteProfileSkillsMutation } from "@pages/SkillsPage/api";
import { RemoveSkillModal as RemoveSkillModalUi } from "@pages/SkillsPage/components/RemoveSkillModal/RemoveSkillModal";
import { RemoveSkillModalProps } from "./types";

export const ProfileRemoveSkillModal = ({
  userId,
  deletedSkills,
  onChangeDeletedSkills,
  onChangeMode,
}: RemoveSkillModalProps) => {
  const resetDeletedSkills = () => {
    onChangeMode(false);
    onChangeDeletedSkills({ userId, name: [] });
  };

  const { mutate } = useDeleteProfileSkillsMutation(userId);

  const handleRemoveSkills = () => {
    mutate({ ...deletedSkills, userId }, { onSuccess: resetDeletedSkills });
  };

  return (
    <RemoveSkillModalUi
      selectedNames={deletedSkills.name}
      disabled={!userId}
      onCancel={resetDeletedSkills}
      onRemove={handleRemoveSkills}
    />
  );
};
