import { RemoveSkillModal } from "@pages/SkillsPage/components/RemoveSkillModal/RemoveSkillModal";
import { RemoveCvSkillModalProps } from "./types";
import { useDeleteCvSkillsMutation } from "../../../api";

export const RemoveCvSkillModal = ({
  cvId,
  deletedSkills,
  onChangeDeletedSkills,
  onChangeMode,
}: RemoveCvSkillModalProps) => {
  const resetDeletedSkills = () => {
    onChangeMode(false);
    onChangeDeletedSkills({ cvId, name: [] });
  };

  const { mutate } = useDeleteCvSkillsMutation(cvId);

  const handleRemoveSkills = () => {
    mutate({ ...deletedSkills, cvId }, { onSuccess: resetDeletedSkills });
  };

  return (
    <RemoveSkillModal
      selectedNames={deletedSkills.name}
      disabled={!cvId}
      onCancel={resetDeletedSkills}
      onRemove={handleRemoveSkills}
    />
  );
};
